"use client"
import { FaAngleLeft } from "react-icons/fa6";
import Image from "next/image";
import { useUser } from "../context/UserContext";

export default function Header({title}) {

const currentUser = useUser()
  return (
    <section className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-1">
        <FaAngleLeft size={22} />
        <p className="text-2xl font-semibold">
          {title || "Home page"}
        </p>
      </div>
      {currentUser?.image && (
        <Image
          src={currentUser.image}
          alt={currentUser.name}
          width={40}
          height={40}
          className="rounded-full h-10 w-10"
        />
      )}
    </section>
  );
}
