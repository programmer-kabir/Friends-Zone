// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { IoClose } from "react-icons/io5";
// import axios from "axios";
// import { useUser } from "@/src/context/UserContext";
// import getAllComments from "@/src/lib/getAllComments";

// const CommentsShow = ({ setIsCommentOpen, post, comments }) => {
//   const [newComment, setNewComment] = useState("");
//   const currentUser = useUser();
//   const [comment, setComments] = useState([]);
//   useEffect(() => {
//     const loadComments = async () => {
//       const data = await getAllComments(post._id);
//       setComments(data?.comments || []);
//     };
//     loadComments();
//   }, [post._id]);

//   const currentPostComment = comments.find(
//     (comment) => comment.postId === post._id
//   );
//   const handleCommentSubmit = async () => {
//     const newCommentData = {
//       postId: post._id,
//       user: {
//         id: currentUser?._id,
//         userName: currentUser?.userName,
//         name: currentUser?.name,
//         image: currentUser?.image,
//       },
//       text: newComment,
//       createdAt: new Date(),
//     };
//     console.log(newCommentData);
//     if (!newComment.trim()) return;
//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_LOCALHOST_LINK}/all-comments`,
//         {
//           newCommentData,
//         }
//       );
//       const result = await res.json();
//       setComments((prev) => [...prev, result.comment]);

//       setNewComment("");
//     } catch (error) {
//       console.error("Failed to post comment:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//       <div className="bg-white rounded-lg w-1/2 relative flex flex-col max-h-[90vh]">
//         {/* Close Button */}
//         <button
//           onClick={() => setIsCommentOpen(false)}
//           className="absolute top-3 right-3 text-gray-500 hover:text-black"
//         >
//           <IoClose size={24} />
//         </button>

//         {/* Scrollable section: title + text + image + comments */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-3">
//           {/* Title */}
//           <h3 className="text-lg font-semibold text-center border-b pb-2">
//             {post?.user?.name} Post
//           </h3>
//           {post.text && <p className="mt-3 text-gray-700">{post.text}</p>}

//           {/* Post Image */}
//           {post.image && (
//             <div className="mt-3">
//               <Image
//                 src={post.image}
//                 alt="Post"
//                 width={800}
//                 height={450}
//                 className="rounded-lg h-[250px] object-contain w-full"
//               />
//             </div>
//           )}

//           {/* Comments */}
//           {currentPostComment?.comments?.length > 0 ? (
//             currentPostComment?.comments?.map((comment, index) => (
//               <section key={index} className="flex gap-2">
//                 <Image
//                   src={comment?.user?.image}
//                   alt="user pic"
//                   width={40}
//                   height={40}
//                   className="rounded-full h-7 w-7"
//                 />
//                 <div className="bg-gray-200 px-2 py-1 rounded-md">
//                   <p className="text-sm font-medium">{comment?.user?.name}</p>
//                   <p className="text-gray-600 text-sm">{comment?.text}</p>
//                 </div>
//               </section>
//             ))
//           ) : (
//             <p className="text-gray-500 text-sm">No comments yet.</p>
//           )}
//         </div>

//         {/* Add new comment - fixed bottom */}
//         <div className="border-t p-3 flex gap-2">
//           <input
//             type="text"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Write a comment..."
//             className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none"
//           />
//           <button
//             onClick={handleCommentSubmit}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//           >
//             Post
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommentsShow;
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useUser } from "@/src/context/UserContext";
import getAllComments from "@/src/lib/getAllComments";

const CommentsShow = ({ setIsCommentOpen, post, comments: initialComments, onCommentAdd }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(initialComments || []);
  const currentUser = useUser();

  useEffect(() => {
    const loadComments = async () => {
      const data = await getAllComments(post._id);
      console.log(data);
      setComments(data?.comments || []);
    };
    loadComments();
  }, [post._id]);
console.log(comments);
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const newCommentData = {
      postId: post._id,
      user: {
        id: currentUser?._id,
        userName: currentUser?.userName,
        name: currentUser?.name,
        image: currentUser?.image,
      },
      text: newComment,
      createdAt: new Date(),
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCALHOST_LINK}/all-comments`,
        {newCommentData} 
      );

      const result = res.data;

      // ✅ instant UI update
      setComments((prev) => [...prev, result.comment]);
  onCommentAdd(result);
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

        {/* Scrollable section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <h3 className="text-lg font-semibold text-center border-b pb-2">
            {post?.user?.name} Post
          </h3>

          {post.text && <p className="mt-3 text-gray-700">{post.text}</p>}

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

          {/* ✅ Comments Render */}
          {comments.length > 0 ? (
            comments.map((comment, index) => (
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

        {/* Add new comment */}
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
