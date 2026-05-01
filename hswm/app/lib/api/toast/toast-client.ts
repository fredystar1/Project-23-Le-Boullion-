import "server-only";

const TOAST_HOSTNAME = process.env.TOAST_HOSTNAME!;
const TOAST_CLIENT_ID = process.env.TOAST_CLIENT_ID!;
const TOAST_CLIENT_SECRET = process.env.TOAST_CLIENT_SECRET!;
const TOAST_USER_ACCESS_TYPE = "TOAST_MACHINE_CLIENT";
const TOAST_RESTAURANT_GUID = process.env.TOAST_RESTAURANT_GUID!;

type ToastAuthResponse = {
  token: {
    accessToken: string;
  };
};

type ToastMenu = {
  name: string;
  posName: string;
  guid: string;
  multiLocationId: string;
  masterId: number;
  description: string;
  highResImage: string | null;
  image: string | null;
  visibility: string[];
  availability: { alwaysAvailable: boolean };
  menuGroups: Record<string, unknown>[];
  posButtonColorLight: string;
  posButtonColorDark: string;
};

type ToastMenuResponse = {
  restaurantGuid: string;
  lastUpdated: string;
  restaurantTimeZone: string;
  menus: ToastMenu[];
  modifierGroupReferences: string;
  modifierOptionReferences: string;
  preModifierGroupReferences: string;
};

type ToastInventoryItem = {
  guid?: string;
  multiLocationId?: string;
  status: "IN_STOCK" | "OUT_OF_STOCK" | "QUANTITY";
  quantity?: number;
  versionId?: string;
};

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

export async function getToastMenuItems(): Promise<ToastMenuResponse> {
  return toastFetch<ToastMenuResponse>("/menus/v2/menus");
}

export async function getToastInventory(): Promise<ToastInventoryItem[]> {
  return toastFetch<ToastInventoryItem[]>("/stock/v1/inventory");
}

export async function getInventoryGuids(): Promise<string[]> {
  const inventory = await getToastInventory();
  const guidArray = inventory.flatMap((item) => (item.guid ? [item.guid] : []));
  return guidArray;
}

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

function decodeJwtPayload(token: string) {
  const payload = token.split(".")[1];
  const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return JSON.parse(Buffer.from(padded, "base64").toString("utf8"));
}

export async function debugToastToken() {
  const token = await getToastAccessToken();
  const payload = decodeJwtPayload(token);
  console.log(payload.scope);
  return payload;
}
