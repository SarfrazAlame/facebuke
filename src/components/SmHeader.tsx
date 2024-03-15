import React from "react";
import UserProfile from "./UserProfile";
import { Input } from "./ui/input";
import UserForm from "./UserForm";
import { IoMdPhotos } from "react-icons/io";
import { getAuthSession } from "@/lib/auth";

const SmHeader = async() => {
  const session = await getAuthSession()
  const user = session?.user
  return (
    <div className="w-full flex justify-between bg-white mt-1 gap-4 py-2">
      <div>
        <UserProfile user={user} />
      </div>

      <div>
        <Input
          type="text"
          className="bg-gray-100 min-[340px]:w-60 min-[440px]:w-80 min-[524px]:w-96 rounded-full outline-none"
          placeholder="What's on your mind"
        />
      </div>
      <div className="flex flex-col">
        <IoMdPhotos className="text-green-400 text-2xl"/>
        <UserForm user={user}/>
      </div>
    </div>
  );
};

export default SmHeader;
