"use client";
import { useUser } from "@/src/context/UserContext";
import Image from "next/image";
import React, { useState } from "react";
import { PiImagesFill } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { FaGlobeAmericas, FaLock, FaUserFriends } from "react-icons/fa";
import axios from "axios";
const NewPost = ({ onClose }) => {
  const currentUser = useUser();
  //   console.log(currentUser);
  const [isAudienceOpen, setIsAudienceOpen] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState("Public");
  const [postText, setPostText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const audienceOptions = [
    { label: "Public", icon: <FaGlobeAmericas className="w-4 h-4" /> },
    { label: "Friends", icon: <FaUserFriends className="w-4 h-4" /> },
    { label: "Only Me", icon: <FaLock className="w-4 h-4" /> },
  ];

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setSelectedImageFile(file);
    }
  };
  const uploadImageToImgbb = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("image", file);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data?.data?.url || null;
  };
  const handlePost = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      let imageUrl = null;
      if (selectedImageFile) {
        imageUrl = await uploadImageToImgbb(selectedImageFile);
      }
      const newPost = {
        userId: currentUser._id,
        text: postText,
        image: imageUrl,
        audience: selectedAudience,
        likes: [],
        createdAt: new Date().toISOString(),
      };
      await axios.post("http://localhost:5000/all-posts", newPost);
      console.log("Post created:", newPost);
      setPostText("");
      setImagePreview(null);
      setSelectedImageFile(null);
      setSelectedAudience("Public");
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 ">
      <form
        onSubmit={handlePost}
        className="bg-white rounded-xl shadow-xl w-full max-w-lg p-5 relative max-h-4/5 overflow-y-scroll"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
        >
          <IoClose size={24} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Create Post
        </h2>

        {/* User Info + Audience */}
        <div className="flex items-center gap-3 mb-4 relative">
          <Image
            src={currentUser?.image}
            alt="Profile"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div className="flex flex-col w-full">
            <p className="font-medium text-gray-700">{currentUser?.name}</p>
            <button
              onClick={() => setIsAudienceOpen(!isAudienceOpen)}
              className="flex items-center gap-2 px-2 py-1 text-sm rounded bg-gray-200 w-max mt-1"
            >
              {
                audienceOptions.find((opt) => opt.label === selectedAudience)
                  ?.icon
              }
              {selectedAudience}
            </button>

            {isAudienceOpen && (
              <div className="absolute top-12 left-14 w-40 bg-white border rounded-lg shadow-lg z-50">
                {audienceOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => {
                      setSelectedAudience(opt.label);
                      setIsAudienceOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-sm"
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-3 resize-none ">
          <textarea
            placeholder="What's on your mind?"
            rows={2}
            className="w-full   focus:outline-none"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          {imagePreview && (
            <div className="relative">
              <Image
                src={imagePreview}
                alt="Preview"
                width={500}
                height={300}
                onChange={handleImageChange} // works now
                className="rounded-lg object-cover w-full max-h-80"
              />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black"
              >
                <IoClose size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Add Options */}
        <div className="border border-gray-200 rounded-lg mt-4">
          <div className="flex justify-between items-center px-4 py-2">
            <span className="text-gray-600 text-sm font-medium">
              Add to your post
            </span>
            <div className="flex gap-3">
              {/* Image Upload Button */}
              <label className="cursor-pointer text-green-600">
                <PiImagesFill size={22} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading} // disable while loading
          className={`cursor-pointer mt-4 w-full py-2 rounded-lg text-white font-semibold transition flex items-center justify-center ${
            isLoading ? "bg-gray-400" : "bg-[#0866FF] hover:bg-[#2176FF]"
          }`}
        >
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
          )}
          {isLoading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default NewPost;
