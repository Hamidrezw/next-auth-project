import Panel from "@/src/components/Panel";
import { getUser } from "@/src/utils/auth";

const Page = async () => {
  const user = await getUser();
  return (
    <>
      <Panel username={user?.name} />
    </>
  );
};

export default Page;
