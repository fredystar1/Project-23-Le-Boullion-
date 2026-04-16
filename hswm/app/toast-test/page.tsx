import { getToastInventory } from "../lib/api/toast/toast-client";

const Page = async () => {
  const response = await getToastInventory();

  console.log(response);

  return <div>{JSON.stringify(response)}</div>;
};

export default Page;
