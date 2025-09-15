"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosSearch, IoMdNotificationsOutline } from "react-icons/io";
import logo from "@/public/asset/logo.png";
import { IoHomeOutline } from "react-icons/io5";
import { PiMessengerLogoBold } from "react-icons/pi";
import { BsPlusSquare } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useUser } from "@/src/context/UserContext";
import { LiaUserFriendsSolid } from "react-icons/lia";
import Link from "next/link";
import SearchUser from "./SearchUser";

export default function Sidebar() {
  const [isSearchModal, setIsSearchModal] = useState(false);
const currentUser = useUser();

  const router = useRouter();
   const handleLogout = () => {
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/signin");
  };
  return (
    <section className="">

      <aside className="fixed w-1/5 overflow-y-scroll h-full bg-white shadow-xl flex flex-col justify-between">
        {/* Top Section */}
        <nav className="flex flex-col space-y-2 mb-5">
          <div className="w-[75%] mx-auto">
            <Image src={logo} alt="friends-zone" className="w-full" />
          </div>

          <Link href={"/"} className="flex items-center gap-2 hover:bg-[#f0f0f0] px-3 py-2 rounded-md cursor-pointer">
            <IoHomeOutline className="w-6 h-6" />
            <p className="text-lg pt-1.5">Home</p>
          </Link>

          <div className="px-3">
            <button
              onClick={() => setIsSearchModal(true)}
              className="flex items-center gap-2 border-2 border-[#E7E5E4] px-2 py-2 text-base text-[#344258] w-full rounded-lg bg-[#f7f7f7]"
            >
              <IoIosSearch className="w-7 h-7" />
              <input
                type="text"
                placeholder="Search users..."
                className="outline-none w-full pr-2"
              />
            </button>
          </div>

          <div className="flex items-center gap-2 hover:bg-[#f0f0f0] px-3 py-2 rounded-md cursor-pointer">
            <LiaUserFriendsSolid className="w-6 h-6" />
            <p className="text-lg pt-1.5">Friends</p>
          </div>
          <div className="flex items-center gap-2 hover:bg-[#f0f0f0] px-3 py-2 rounded-md cursor-pointer">
            <PiMessengerLogoBold className="w-6 h-6" />
            <p className="text-lg pt-1.5">Messages</p>
          </div>

          <div className="flex items-center gap-2 hover:bg-[#f0f0f0] px-3 py-2 rounded-md cursor-pointer">
            <IoMdNotificationsOutline className="w-6 h-6" />
            <p className="text-lg pt-1.5">Notification</p>
          </div>

          <div className="flex items-center gap-2 hover:bg-[#f0f0f0] px-3 py-2 rounded-md cursor-pointer">
            <BsPlusSquare className="w-6 h-6" />
            <p className="text-lg pt-1.5 font-normal">Create Post</p>
          </div>

          <Link href={`/profiles/${currentUser?.userName}`} className="flex items-center gap-2 hover:bg-[#f0f0f0] px-3 py-2 rounded-md cursor-pointer">
            <Image
              src={currentUser?.image}
              alt="Profile Image"
              width={50}
              height={50}
              className="w-9 h-9 rounded-full object-cover"
            />
            <p className="text-lg pt-0.5 font-normal">Profile</p>
          </Link>
        </nav>

        {/* Bottom Section (Sign Out) */}
        <div onClick={handleLogout} className="flex items-center gap-2 hover:bg-[#f0f0f0] px-3 py-2 rounded-md cursor-pointer mb-4 border-t-2">
          <GoSignOut className="w-6 h-6" />
          <p className="text-lg pt-1.5">Sign Out</p>
        </div>
      </aside>
      {isSearchModal && (
       <SearchUser setIsSearchModal={setIsSearchModal}/>
      )}
    </section>
  );
}
