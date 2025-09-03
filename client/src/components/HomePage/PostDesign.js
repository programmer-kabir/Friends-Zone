"use client";
import { useUser } from "@/src/context/UserContext";
import Image from "next/image";
import React, { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { FaRegSmile } from "react-icons/fa";
import NewPost from "../NewPost";

const PostDesign = () => {
      const [isPOstModal, setIsPostModal] = useState(false);

  const currentUser = useUser();

  return (
    <>
    <div className="border border-gray-200 bg-white rounded-2xl shadow-sm px-5 py-4 w-full">
      {/* Top Input Row */}
      <div     onClick={() => setIsPostModal(true)} className="flex items-center gap-4">
        <Image
          src={currentUser?.image}
          alt="Profile Image"
          width={45}
          height={45}
          className="w-11 h-11 rounded-full object-cover border border-gray-300"
        />
        <div className="flex-1">
          <input
            type="text"
            placeholder="What's on your mind?"
            className="w-full px-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none  focus:bg-white transition"
          />
        </div>
      </div>
    
    </div>
      {isPOstModal && <NewPost onClose={() => setIsPostModal(false)} />}
    </>
  );
};

export default PostDesign;
