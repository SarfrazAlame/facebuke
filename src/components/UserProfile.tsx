import Image from "next/image";

type User = {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
  image: string | null;
  emailVerified: Date | null;
  createAt: Date;
  updateAt: Date;
};

const UserProfile = async ({ user }: { user: User }) => {
  return (
    <div className="mt-3 mx-2">
      {user && (
        <>
          <div>
            <Image
              src={user.image}
              alt="logo"
              height={35}
              width={35}
              className="h-10 w-10 rounded-full"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
