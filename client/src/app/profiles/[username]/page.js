import getAllUsers from "@/src/lib/getAllUsers";
import Header from "@/src/components/Header";
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";
import coverImage from "@/public/asset/cover_bg.png";
import { IoMdMail } from "react-icons/io";
import BasicInfo from "@/src/components/profile/BasicInfo";
const Profile = async ({ params }) => {
  const { username } = params;
  const users = await getAllUsers();
  const user = users.find((u) => u.userName === username);
  return (
    <section className="pb-10">
      <Header title={"Profile"} />

      <div className="h-[350px]">
        <Image
          src={user?.coverImage ? user?.coverImage : coverImage}
          alt=""
          className="rounded-lg h-full w-full bg-center"
        />
      </div>
      <div className="-mt-16 relative flex flex-col items-center">
        <Image
          src={user?.image}
          alt={user.name}
          width={120}
          height={120}
          className="rounded-full   shadow-lg w-28 h-28"
        />
        <div className="bg-[#3d70b2] absolute bottom-0 p-1 rounded-full left-[52%]">
          <FaPlus size={25} color="#fff" />
        </div>
      </div>
      <div className="text-start -mt-10 flex items-center gap-10 px-2">
        <div>
          <p className="font-bold text-2xl">0</p>
          <p className="text-lg font-medium">Followers</p>
        </div>
        <div>
          <p className="font-bold text-2xl">0</p>
          <p className="text-lg font-medium">Following</p>
        </div>
        <div>
          <p className="font-bold text-2xl">0</p>
          <p className="text-lg font-medium">Posts</p>
        </div>
      </div>
      <div className="text-center -mt-2">
        <h2 className=" text-2xl font-bold">{user?.name}</h2>
        <p className="text-gray-600">{user?.userName}</p>
      </div>

      <div className="flex items-center w-full gap-6 pt-5">
        <div className="w-[40%]">
          <div
            className="rounded  text-center py-2"
            style={{
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
            }}
          >
            <p>Basic Info</p>
          </div>
          {/* Content */}
          <BasicInfo user={user}/>
        </div>
        <div
          className=" rounded w-[60%] text-center py-2"
          style={{
            boxShadow:
              "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
          }}
        >
          <p>Posts</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
