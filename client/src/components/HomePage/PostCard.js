"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegThumbsUp, FaRegComment, FaShare } from "react-icons/fa";
import { FaGlobeAmericas, FaLock, FaUserFriends } from "react-icons/fa";
import axios from "axios";
import { useUser } from "@/src/context/UserContext";
import { IoClose } from "react-icons/io5";
import CommentsShow from "../Cards/CommentsShow";

export default function PostCard({ post }) {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const currentUser = useUser();
  const [isLiked, setIsLiked] = useState(
    post.likes?.includes(currentUser._id) || false
  );
  const [loading, setLoading] = useState(false);
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
        `${process.env.NEXT_PUBLIC_LOCALHOST_LINK}/all-posts/${post._id}/like`,
        { userId: currentUser._id }
      );
      setLikes(response.data.likes.length);
      setIsLiked(response.data.likes.includes(currentUser._id));
    } catch (error) {
      console.error("Failed to update like:", error);
    }
    setLoading(false);
  };


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_LOCALHOST_LINK}/all-comments`
        );
        setComments(res.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };
    fetchComments();
  }, [post._id]);
  const audienceIcons = {
    Public: <FaGlobeAmericas className="w-3.5 h-3.5 text-gray-500" />,
    Friends: <FaUserFriends className="w-3.5 h-3.5 text-gray-500" />,
    "Only Me": <FaLock className="w-3.5 h-3.5 text-gray-500" />,
  };
  const currentPostComment = comments.find(
    (comment) => comment.postId === post._id
  );
  // console.log(currentPostComment);
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
              className="rounded-lg object-contain max-h-80"
            />
          </div>
        )}

        {/* Like & Comment Count */}
        <div className="flex justify-between text-sm text-gray-500 mt-3 cursor-pointer">
          <p>{likes} Likes</p>

          <p>{currentPostComment?.comments?.length || 0} Comments</p>
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
        <CommentsShow
          setIsCommentOpen={setIsCommentOpen}
          post={post}
          comments={comments}
        />
      )}
    </>
  );
}
