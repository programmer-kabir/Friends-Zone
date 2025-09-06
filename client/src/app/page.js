import PostCard from "../components/HomePage/PostCard";
import PostDesign from "../components/HomePage/PostDesign";
import Sidebar from "../components/HomePage/Sidebar";
import SuggestFriend from "../components/HomePage/SuggestFriend";
import ProtectedRoute from "../components/ProtectedRoute";
import getAllPosts from "../lib/getAllPosts";
import getAllUsers from "../lib/getAllUsers";


export default async function Home() {
const posts = await getAllPosts()
const users = await getAllUsers()
  // merge user info into posts
  const postsWithUser = posts.map((post) => {
    const user = users.find((u) => u._id === post.userId);
    return {
      ...post,
      user,
    };
  });
console.log(users);
  return (
    <ProtectedRoute>
    <section className="flex flex-col lg:flex-row w-full gap-7 pt-2">
  <div className=" h-full w-1/5 bg-white shadow-xl px-6 "><Sidebar /></div>
  <div className="w-full lg:w-3/5  ml-5">
    <PostDesign />
    <div className="space-y-4 pt-5">
      {postsWithUser.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  </div>
  <aside className="w-full lg:w-1/5 bg-amber-400"><SuggestFriend /></aside>
</section>

    </ProtectedRoute>
  );
}

