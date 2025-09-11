"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useUser } from "@/src/context/UserContext";

const CommentsShow = ({ setIsCommentOpen, post, comments }) => {
  const [newComment, setNewComment] = useState("");
  const currentUser = useUser();
  console.log(currentUser);

  const currentPostComment = comments.find(
    (comment) => comment.postId === post._id
  );
  const handleCommentSubmit = async () => {
    const comment = {
      postId: post._id,
      comments: [
        {
          user: {
            id: currentUser?._id,
            userName: currentUser?.userName,
            name: currentUser?.name,
            image: currentUser?.image,
          },
          text: newComment,
          createdAt: new Date(),
        },
      ],
    };
    console.log(comment);
    if (!newComment.trim()) return;
    try {
      //   const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCALHOST_LINK}/allposts/${post._id}/comments`, {
      //     text: newComment,
      //     userId: "currentUserId" // এখান থেকে currentUser._id দেবে context থেকে
      //   });

      //   setComments(res.data.comments);
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg w-1/2 relative flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setIsCommentOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <IoClose size={24} />
        </button>

        {/* Scrollable section: title + text + image + comments */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Title */}
          <h3 className="text-lg font-semibold text-center border-b pb-2">
            {post?.user?.name} Post
          </h3>
          {post.text && <p className="mt-3 text-gray-700">{post.text}</p>}

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

          {/* Comments */}
          {currentPostComment?.comments?.length > 0 ? (
            currentPostComment?.comments?.map((comment, index) => (
              <section key={index} className="flex gap-2">
                <Image
                  src={comment?.user?.image}
                  alt="user pic"
                  width={40}
                  height={40}
                  className="rounded-full h-7 w-7"
                />
                <div className="bg-gray-200 px-2 py-1 rounded-md">
                  <p className="text-sm font-medium">{comment?.user?.name}</p>
                  <p className="text-gray-600 text-sm">{comment?.text}</p>
                </div>
              </section>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
        </div>

        {/* Add new comment - fixed bottom */}
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
  );
};

export default CommentsShow;
