/**
 * Toast API test page — `/toast-test`
 *
 * Developer-only diagnostic page that calls the Toast inventory search
 * API and dumps the raw JSON response to the screen.  Used to verify
 * that the Toast API credentials and inventory endpoints are working.
 *
 * This page should **not** be exposed in production.
 *
 * @module pages/toast-test
 */

import { getToastInventory, getInventoryGuids, getInventoryItemInfo } from "../lib/api/toast/toast-client";

/**
 * Async server component that fetches Toast inventory data and renders
 * it as a JSON string.
 *
 * The raw response is also logged to the server console for debugging.
 *
 * @returns A `<div>` containing the stringified inventory response.
 */
const Page = async () => {
  const response = await getInventoryItemInfo();

  console.log(response);

  return <div className="section bg-amber-50">{JSON.stringify(response)}</div>;
};

export default Page;
