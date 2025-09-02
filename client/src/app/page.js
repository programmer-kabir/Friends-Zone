import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getCurrentUser } from "../ulits/getUser";
import { redirect } from "next/navigation";
import Sidebar from "../components/HomePage/Sidebar";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("authToken")?.value;
  if (!token) return <p>Not logged in</p>;
  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return <p>Invalid token</p>;
  }
  const currentUser = await getCurrentUser(user?.userId);
  if(!currentUser) redirect("/signin");
  return (
   <div>
   <Sidebar currentUser={currentUser}/>
   </div>
  );
}
