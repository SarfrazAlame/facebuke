import { getAuthSession } from "@/lib/auth";
import React from "react";
import UserProfile from "./UserProfile";

const UserLogo = async () => {
  const session = await getAuthSession();
  const user = session?.user;
  return (
    <div>
      <UserProfile user={user} />
    </div>
  );
};

export default UserLogo;
