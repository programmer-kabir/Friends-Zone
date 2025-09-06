// components/LoginModal.jsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">You are not logged in</h2>
        <p className="mb-6">Please sign in to access this content.</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => router.push("/signin")} // <-- এখানে redirect
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
          {/* <button
            onClick={() => console.log("Modal closed")}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button> */}
        </div>
      </div>
    </div>
  );
}
