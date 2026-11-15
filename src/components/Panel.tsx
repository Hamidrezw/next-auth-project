"use client";

import { useRouter } from "next/navigation";
import { Logout } from "../actions/auth";

const Panel = ({ username }: { username?: string }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await Logout();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <h1 className="text-xl font-bold text-center mt-6">wellcome {username}</h1>
      <button onClick={handleLogout} className="text-white bg-red-600 text-lg rounded-3xl p-5 w-fit mt-4 mx-auto cursor-pointer">LogOut</button>
    </>
  );
};

export default Panel;
