"use client";
import { useUser } from "@/src/context/UserContext";

const Profile = () => {
  const user = useUser();
  console.log(user);
  return <div></div>;
};

export default Profile;
