"use client";
import { useState } from "react";
import Image from "next/image";
import { FaRegThumbsUp, FaRegComment, FaShare } from "react-icons/fa";
import { FaGlobeAmericas, FaLock, FaUserFriends } from "react-icons/fa";
import axios from "axios";
import { useUser } from "@/src/context/UserContext";
import { IoClose } from "react-icons/io5";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const currentUser = useUser();

  const [isLiked, setIsLiked] = useState(
    post.likes?.includes(currentUser._id) || false
  );
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  // Time ago function
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return `${seconds} sec ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  };

  const handleLike = async () => {
    // if (loading) return; // prevent multiple clicks
    // setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCALHOST_LINK}/allposts/${post._id}/like`,
        { userId: currentUser._id }
      );
      setLikes(response.data.likes.length);
      setIsLiked(response.data.likes.includes(currentUser._id));
    } catch (error) {
      console.error("Failed to update like:", error);
    }
    setLoading(false);
  };
  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    // backend call to save comment here
    post.comments = [
      ...(post.comments || []),
      { text: newComment, user: { name: "You" } },
    ];
    setNewComment("");
  };

  const audienceIcons = {
    Public: <FaGlobeAmericas className="w-3.5 h-3.5 text-gray-500" />,
    Friends: <FaUserFriends className="w-3.5 h-3.5 text-gray-500" />,
    "Only Me": <FaLock className="w-3.5 h-3.5 text-gray-500" />,
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 border border-gray-200">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <Image
            src={post?.user?.image}
            alt={post?.user?.name || "User"}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{post?.user?.name}</h3>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">{timeAgo(post.createdAt)}</p>
              {audienceIcons[post?.audience]}
            </div>
          </div>
        </div>

        {/* Post Text */}
        {post.text && <p className="mt-3 text-gray-700">{post.text}</p>}

        {/* Post Image */}
        {post.image && (
          <div className="mt-3">
            <Image
              src={post.image}
              alt="Post"
              width={800}
              height={450}
              className="rounded-lg object-contain w-full"
            />
          </div>
        )}

        {/* Like & Comment Count */}
        <div className="flex justify-between text-sm text-gray-500 mt-3 cursor-pointer">
          <p>{likes} Likes</p>
          <p>{post.comments?.length || 0} Comments</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center border-t border-gray-200 mt-3 pt-2 text-gray-600 text-sm font-medium">
          <button
            onClick={handleLike}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-2 w-1/3 justify-center py-2 rounded-lg transition ${
              isLiked ? "text-blue-600" : "hover:bg-gray-100"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FaRegThumbsUp />
            {loading ? "..." : "Like"}
          </button>
          <button
            onClick={() => setIsCommentOpen(true)}
            className="flex items-center gap-2 w-1/3 justify-center py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
          >
            <FaRegComment />
            Comment
          </button>
          <button className="flex items-center gap-2 w-1/3 justify-center py-2 rounded-lg hover:bg-gray-100 transition">
            <FaShare />
            Share
          </button>
        </div>
      </div>
      {isCommentOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg w-1/2  relative  flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setIsCommentOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <IoClose size={24} />
            </button>

            {/* Title */}
            <h3 className="text-lg font-semibold p-4 border-b text-center">{post?.user?.name} Post</h3>
            {post.text && <p className="mt-3 text-gray-700 px-4">{post.text}</p>}

            {/* Post Image */}
            {post.image && (
              <div className="mt-3">
                <Image
                  src={post.image}
                  alt="Post"
                  width={800}
                  height={450}
                  className="rounded-lg h-[250px] object-contain w-full"
                />
              </div>
            )}
            {/* Comments list (scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {post.comments?.length > 0 ? (
                post.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-2 last:border-none"
                  >
                    <p className="text-sm font-medium">{comment.user.name}</p>
                    <p className="text-gray-600 text-sm">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No comments yet.</p>
              )}
            </div>

            {/* Add new comment (always at bottom) */}
            <div className="border-t p-3 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
              <button
                onClick={handleCommentSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
