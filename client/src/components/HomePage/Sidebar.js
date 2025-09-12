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

export default function Sidebar() {
  const [isSearchModal, setIsSearchModal] = useState(false);
const currentUser = useUser();

  const router = useRouter();
   const handleLogout = () => {
    // Clear authToken cookie (expire it instantly)
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // Redirect to signin page
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white relative p-6 rounded-lg shadow-lg w-2/5">
            <button
              onClick={() => setIsSearchModal(false)}
              className="flex items-center justify-end absolute  top-3 right-3 cursor-pointer"
            >
              <IoClose size={32} />
            </button>
            <h2 className="text-2xl font-medium mt-4 pb-3">Search Users</h2>
            <input
              type="text"
              placeholder="Type here user name or email..."
              className="border-2 text-lg px-3 py-2 w-full rounded outline-none text-[#344258] border-[#E7E5E4]"
            />
            <div className="text-center flex flex-col justify-center items-center pt-16 pb-10">
              <IoIosSearch size={50} className="text-[#78716C]"/>
              <p className="text-xl text-[#0C0A09] font-medium pt-5">Start typing to search users</p>
              <p className="text-[#78716C] text-lg pt-2">Search results will appear here</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
