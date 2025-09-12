import { FaAngleLeft } from "react-icons/fa6";
import PostCard from "../components/HomePage/PostCard";
import PostDesign from "../components/HomePage/PostDesign";
import Sidebar from "../components/HomePage/Sidebar";
import SuggestFriend from "../components/HomePage/SuggestFriend";
import ProtectedRoute from "../components/ProtectedRoute";
import getAllPosts from "../lib/getAllPosts";
import getAllUsers from "../lib/getAllUsers";
import RootLayout from "./layout";
import Header from "../components/Header";

export default async function Home() {
  const posts = await getAllPosts();
  const users = await getAllUsers();
  // merge user info into posts
  const postsWithUser = posts.map((post) => {
    const user = users.find((u) => u._id === post.userId);
    return {
      ...post,
      user,
    };
  });
  return (
    <ProtectedRoute>
    <Header title={"av"}/>
       <div className="flex flex-col lg:flex-row w-full gap-6">

        <section className="w-full">
          <PostDesign />
          <div className="space-y-4 mt-4">
            {postsWithUser.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>

      </div>

    </ProtectedRoute>
  );
}
