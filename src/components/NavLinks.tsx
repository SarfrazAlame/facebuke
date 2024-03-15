"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { LuHome, LuShoppingBag } from "react-icons/lu";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { buttonVariants } from "./ui/button";
import { RiNotification4Fill } from "react-icons/ri";

const icons = [
  {
    name: "Home",
    icon: LuHome,
    href: "/dashboard/home",
  },
  {
    name: "friends",
    icon: FaUserFriends,
    href: "/dashboard/friends",
  },
  {
    name: "videos",
    icon: MdOutlineOndemandVideo,
    href: "/dashboard/videos",
  },
  {
    name: "shopping",
    icon: LuShoppingBag,
    href: "/dashboard/marketplace",
  },
  {
    name: "notifications",
    icon: RiNotification4Fill,
    href: "/dashboard/notifications",
  },
];

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="w-full flex justify-between md:justify-center">
        {icons.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={buttonVariants({
                variant: isActive ? "secondary" : "ghost",
                className:
                  "flex  min-[300px]:w-12 min-[370px]:w-16 sm:mx-3 mx-0 md:w-20 lg:w-24 -py-2 hover:bg-gray-200",
              })}
            >
              <Icon className="text-xl md:text-2xl text-gray-700" />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default NavLinks;
