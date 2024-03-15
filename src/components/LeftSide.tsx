import Link from "next/link";
import React from "react";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { CgMenuGridR } from "react-icons/cg";
import { RiNotification4Fill } from "react-icons/ri";
import UserProfile from "./UserProfile";
import { getAuthSession } from "@/lib/auth";

const LeftSide = async () => {
  const session = await getAuthSession();
  const user = session?.user;
  return (
    <div className="w-48 flex gap-2">
      <div className="p-2 bg-gray-100 text-2xl  rounded-full cursor-pointer">
        <CgMenuGridR />
      </div>
      <div className="p-2 bg-gray-100 text-2xl  rounded-full cursor-pointer">
        <BiSolidMessageRoundedDots />
      </div>
      <Link
        href={"/notifications"}
        className="p-2 bg-gray-100 rounded-full cursor-pointer"
      >
        <RiNotification4Fill className="text-2xl" />
      </Link>
      <div>
        <UserProfile user={user} />
      </div>
    </div>
  );
};

export default LeftSide;
