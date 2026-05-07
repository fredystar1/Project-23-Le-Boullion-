import {
  getToastInventory,
  getInventoryGuids,
  getInventoryItemInfo,
  getToastMenuItems,
} from "../../lib/api/toast/toast-client";

const Page = async () => {
  const response = await getToastMenuItems();
  // console.log(Object.keys(response.menus));
  console.log(response.menus);
  const menus = response.menus;
  const wineMenu = menus.find((menu) => menu.name === "Wine");
  const whiteWines = wineMenu?.menuGroups.find(
    (wine_type: any) => wine_type.name === "White Wine",
  );
  // console.log(whiteWines);

  return <div className="section"></div>;
  // return <div className="section bg-amber-50">{JSON.stringify(response)}</div>;
};

export default Page;
