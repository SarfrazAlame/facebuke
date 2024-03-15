import React from "react";
import UserProfile from "./UserProfile";
import { getAuthSession } from "@/lib/auth";
import { MdFeed, MdGroup } from "react-icons/md";
import { VscSave } from "react-icons/vsc";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiVideoFill } from "react-icons/pi";
import { BsCalendar4Event } from "react-icons/bs";
import { BiSolidMessageRoundedCheck } from "react-icons/bi";
import Link from "next/link";

const SideNav = async () => {
  const session = await getAuthSession();
  const user = session?.user
  return (
    <div className="hidden md:block md:w-48 mx-8 lg:w-72 h-screen mt-20 bg-gray-100 fixed">
      <div className="flex">
        <Link href={`/profile/${user?.id}`} className="flex hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer">
          <UserProfile user={user} />
          <span className="mt-1.5 text-xl mx-5 font-semibold text-gray-700">
            {user?.name}
          </span>
        </Link>
      </div>
      <div>
        <div className="flex my-4 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer">
          <MdGroup className="text-3xl text-blue-500" />
          <span className="mt-1 text-md mx-6 font-semibold text-gray-700">
            Friends
          </span>
        </div>
      </div>
      <div>
        <div className="flex my-4 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer ">
          <VscSave className="text-3xl text-pink-500" />
          <span className="mt-1 text-md mx-6 font-semibold text-gray-700">
            Saved
          </span>
        </div>
      </div>

      <div>
        <div>
          <div className="flex my-4 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer">
            <RxCounterClockwiseClock className="text-3xl text-blue-400" />
            <span className="mt-1 text-md mx-6 font-semibold text-gray-700">
              Memories
            </span>
          </div>
        </div>
        
        <div className="flex my-4 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer">
          <HiMiniUserGroup className="text-3xl text-blue-500" />
          <span className="mt-1 text-md mx-6 font-semibold text-gray-700">
            Groups
          </span>
        </div>
      </div>

      <div className="">
        <div className="flex my-4 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer">
          <PiVideoFill className="text-3xl text-blue-500" />
          <span className="mt-1 text-md mx-6 font-semibold text-gray-700">
            Videos
          </span>
        </div>
      </div>

      <div className="">
        <div className="flex my-4 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer">
          <MdFeed className="text-3xl text-blue-500" />
          <span className="mt-1 text-md mx-6 font-semibold text-gray-700">
            Feeds
          </span>
        </div>
      </div>

      <div className="">
        <div className="flex my-4 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer">
          <BsCalendar4Event className="text-3xl text-blue-500" />
          <span className="mt-1 text-md mx-6 font-semibold text-gray-700">
            Events
          </span>
        </div>
      </div>
      <div className="">
        <div className="flex my-4 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer">
          <BiSolidMessageRoundedCheck className="text-3xl text-pink-500" />
          <span className="mt-1 text-md mx-6 font-semibold text-gray-700">
            Messenger
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
