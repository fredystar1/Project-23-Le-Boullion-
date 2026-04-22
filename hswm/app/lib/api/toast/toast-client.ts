/**
 * Toast POS API client — server-only.
 *
 * Wraps the Toast REST API for authentication, menu retrieval, and
 * inventory queries. Every function in this module is intended to run
 * exclusively on the server (enforced by the `"server-only"` import) so
 * that credentials are never leaked to the client bundle.
 *
 * Environment variables consumed (all required):
 *
 * | Variable                  | Description                            |
 * | ------------------------- | -------------------------------------- |
 * | `TOAST_HOSTNAME`          | Base URL of the Toast API.             |
 * | `TOAST_CLIENT_ID`         | OAuth client ID.                       |
 * | `TOAST_CLIENT_SECRET`     | OAuth client secret.                   |
 * | `TOAST_RESTAURANT_GUID`   | External GUID identifying the venue.   |
 *
 * @module toast-client
 */

import "server-only";

// ---------------------------------------------------------------------------
// Environment configuration
// ---------------------------------------------------------------------------

/** Base URL of the Toast API (e.g. `https://ws-api.toasttab.com`). */
const TOAST_HOSTNAME = process.env.TOAST_HOSTNAME!;

/** OAuth client ID issued by Toast. */
const TOAST_CLIENT_ID = process.env.TOAST_CLIENT_ID!;

/** OAuth client secret issued by Toast. */
const TOAST_CLIENT_SECRET = process.env.TOAST_CLIENT_SECRET!;

/** Fixed access type for machine-to-machine authentication. */
const TOAST_USER_ACCESS_TYPE = "TOAST_MACHINE_CLIENT";

/** Restaurant GUID used in the `Toast-Restaurant-External-ID` header. */
const TOAST_RESTAURANT_GUID = process.env.TOAST_RESTAURANT_GUID!;

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

/**
 * Shape of the JSON body returned by the Toast authentication endpoint.
 */
type ToastAuthResponse = {
  token: {
    /** Short-lived JWT access token. */
    accessToken: string;
  };
};

/**
 * Represents a single menu item returned by the Toast Menus API.
 */
type ToastMenuItem = {
  /** Toast-assigned GUID for this menu item. */
  guid: string;
  /** Optional multi-location identifier. */
  multiLocationId?: string;
  /** Display name of the menu item. */
  name: string;
  /** Price look-up code. */
  plu?: string;
  /** Stock-keeping unit. */
  sku?: string;
  /** Array of image objects associated with the item. */
  images?: { url: string }[];
  /** Whether the item can be ordered online. */
  orderableOnline?: string;
};

/**
 * Represents a single inventory record returned by the Toast Stock API.
 */
type ToastInventoryItem = {
  /** Toast-assigned GUID for this inventory entry. */
  guid?: string;
  /** Optional multi-location identifier. */
  multiLocationId?: string;
  /** Current stock status. */
  status: "IN_STOCK" | "OUT_OF_STOCK" | "QUANTITY";
  /** Available quantity (only meaningful when `status` is `"QUANTITY"`). */
  quantity?: number;
  /** Optimistic-locking version identifier. */
  versionId?: string;
};

// ---------------------------------------------------------------------------
// Authentication
// ---------------------------------------------------------------------------

/**
 * Authenticate with the Toast API and retrieve a short-lived access token.
 *
 * Uses machine-client credentials (client ID + secret) and
 * `TOAST_MACHINE_CLIENT` access type.  The response is **not** cached
 * (`cache: "no-store"`) because tokens are short-lived.
 *
 * @returns The JWT access token string.
 * @throws {Error} If the authentication request fails.
 */
export async function getToastAccessToken(): Promise<string> {
  const response = await fetch(
    `${TOAST_HOSTNAME}/authentication/v1/authentication/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: TOAST_CLIENT_ID,
        clientSecret: TOAST_CLIENT_SECRET,
        userAccessType: TOAST_USER_ACCESS_TYPE,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Toast auth failed: ${response.status} ${text}`);
  }

  const data = (await response.json()) as ToastAuthResponse;
  return data.token.accessToken;
}

// ---------------------------------------------------------------------------
// Generic fetch helper
// ---------------------------------------------------------------------------

/**
 * Perform an authenticated request against the Toast API.
 *
 * Automatically obtains a fresh access token via
 * {@link getToastAccessToken}, attaches the required `Authorization` and
 * `Toast-Restaurant-External-ID` headers, and deserialises the JSON
 * response.
 *
 * @typeParam T - Expected shape of the JSON response body.
 * @param path - API path *after* the hostname (e.g. `"/menus/v2/menus"`).
 * @param init - Optional `RequestInit` overrides (method, body, headers, etc.).
 * @returns Parsed JSON response body.
 * @throws {Error} If the request returns a non-2xx status.
 *
 * @internal
 */
async function toastFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await getToastAccessToken();

  const response = await fetch(`${TOAST_HOSTNAME}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Toast-Restaurant-External-ID": TOAST_RESTAURANT_GUID,
      ...(init.method !== "GET" && { "Content-Type": "application/json" }),
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Toast request failed
path: ${path}
restaurant: ${TOAST_RESTAURANT_GUID}
status: ${response.status}
body: ${text}`,
    );
  }
  
  return response.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Menu endpoints
// ---------------------------------------------------------------------------

/**
 * Fetch the complete list of menu items from the Toast Menus v2 API.
 *
 * @returns Array of {@link ToastMenuItem} objects.
 */
export async function getToastMenuItems(): Promise<ToastMenuItem[]> {
  return toastFetch<ToastMenuItem[]>("/menus/v2/menus");
}

// ---------------------------------------------------------------------------
// Inventory endpoints
// ---------------------------------------------------------------------------

/**
 * Fetch the current inventory snapshot from the Toast Stock v1 API.
 *
 * @returns Array of {@link ToastInventoryItem} records.
 */
export async function getToastInventory(): Promise<ToastInventoryItem[]> {
  return toastFetch<ToastInventoryItem[]>("/stock/v1/inventory");
}

/**
 * Retrieve only the GUIDs of items that exist in inventory.
 *
 * Convenience wrapper around {@link getToastInventory} that filters out
 * records without a `guid` and returns a flat string array.
 *
 * @returns Array of inventory-item GUID strings.
 */
export async function getInventoryGuids(): Promise<string[]> {
  const inventory = await getToastInventory();
  const guidArray = inventory.flatMap((item) => (item.guid ? [item.guid] : []));
  return guidArray;
}

/**
 * Perform a bulk inventory search by GUID.
 *
 * Fetches the full inventory GUID list via {@link getInventoryGuids} and
 * then POSTs them to the Toast `/stock/v1/inventory/search` endpoint to
 * retrieve detailed item information.
 *
 * @returns The search-result payload (shape is `any` because the Toast
 *          search response schema is not strongly typed here).
 */
export async function getInventoryItemInfo(): Promise<any> {
  const guidArray = await getInventoryGuids();
  
  if (!guidArray.length) return [];

  return toastFetch<any>("/stock/v1/inventory/search", {
    method: "POST",
    body: JSON.stringify({
      guids: guidArray,
    }),
  });
}

// ---------------------------------------------------------------------------
// Debug utilities
// ---------------------------------------------------------------------------

/**
 * Decode the payload section of a JWT token (base64url → JSON).
 *
 * @param token - The raw JWT string (`header.payload.signature`).
 * @returns The parsed payload object.
 *
 * @internal
 */
function decodeJwtPayload(token: string) {
  const payload = token.split(".")[1];
  const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return JSON.parse(Buffer.from(padded, "base64").toString("utf8"));
}

/**
 * Obtain a Toast access token, decode its JWT payload, and log the
 * `scope` claim to the console.
 *
 * Useful during development to verify which API scopes the current
 * credentials grant.
 *
 * @returns The decoded JWT payload object.
 */
export async function debugToastToken() {
  const token = await getToastAccessToken();
  const payload = decodeJwtPayload(token);
  console.log(payload.scope);
  return payload;
}
