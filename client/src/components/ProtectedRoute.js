// components/ProtectedRoute.js
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getCurrentUser } from "../ulits/getUser";
import { UserProvider } from "../context/UserContext";
import LoginModal from "./LoginModal";

export default async function ProtectedRoute({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) return <LoginModal />

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return ;
  }

  const currentUser = await getCurrentUser(user?.userId);
  if (!currentUser) return ;

  // Client-side Context wrapping
  return <UserProvider value={currentUser}>{children}</UserProvider>;
}
