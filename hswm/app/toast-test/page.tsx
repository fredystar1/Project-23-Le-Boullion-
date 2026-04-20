import { getToastInventory, getInventoryGuids, getInventoryItemInfo } from "../lib/api/toast/toast-client";

const Page = async () => {
  const response = await getInventoryItemInfo();

  console.log(response);

  return <div className="section bg-amber-50">{JSON.stringify(response)}</div>;
};

export default Page;
