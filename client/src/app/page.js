import PostCard from "../components/HomePage/PostCard";
import PostDesign from "../components/HomePage/PostDesign";
import SuggestFriend from "../components/HomePage/SuggestFriend";
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
    <section className="flex w-full gap-6">
      {/* main feed */}
      <div className="flex-1">
        <PostDesign />
        <div className="space-y-4 pt-5">
          {postsWithUser.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* right sidebar */}
      <aside className="w-1/3 bg-amber-400">
        <SuggestFriend />
      </aside>
    </section>
  );
}
