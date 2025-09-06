"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "@/src/components/ToastProvider";

const LoginFrom = ({ mode = "signup" }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);

  const togglePassword = () => setShowPassword(!showPassword);
  const uploadImageToImgbb = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("image", file);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log(data.data);
    return data?.data?.url || null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");
      if (mode === "signup") {
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const userName = formData.get("userName");
        const name = firstName + " " + lastName;
        if (!name || !email || !password || !userName) {
          return res.status(400).json({ message: "All fields required" });
        }

        const imageUrl = await uploadImageToImgbb(file);
        console.log(name);
        console.log(imageUrl);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCALHOST_LINK}/register`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name,
              userName,
              email,
              password,
              image: imageUrl,
            }),
          }
        );
        if (response.status === 201) {
          toast.success("User created successfully!");
          router.push("/");
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } else if (mode === "signin") {
        if (!email || !password) {
          alert("All fields are required");
          return;
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCALHOST_LINK}/signin`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
            credentials: "include",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
             document.cookie = `authToken=${data.token}; path=/`;
          router.push("/");
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="pt-5 space-y-4" onSubmit={handleSubmit}>
      {mode === "signup" && (
        <>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 
              focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-transparent transition-all"
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 
              focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-transparent transition-all"
            placeholder="Last Name"
          />
          
    
        </div>
          <input
        type="text"
        name="userName"
        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-transparent transition-all"
        placeholder="Enter Your userName"
      />
        </>
      )}

      {/* Email */}
      <input
        type="email"
        name="email"
        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-transparent transition-all"
        placeholder="Enter Your Email"
      />

      {/* Password */}
      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 
            focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-transparent transition-all pr-12"
          placeholder="Enter Your Password"
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
        >
          {showPassword ? (
            <FaEye className="w-5 h-5" />
          ) : (
            <FaEyeSlash className="w-5 h-5" />
          )}
        </button>
      </div>
{mode === "signup" && (     <div>
        <label
          for="File"
          class="block rounded border border-gray-300 bg-white p-3 text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        >
          <div class="flex items-center justify-center gap-4">
            <span class="font-medium dark:text-white">
              {" "}
              {file ? file.name : "Upload your file(s)"}
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
              />
            </svg>
          </div>

          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            id="File"
            class="sr-only"
          />
        </label>
      </div>
)}
 
      {/* Terms only for signup */}
      {mode === "signup" && (
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            className="pt-0.5 w-4 h-4 text-purple-400 bg-gray-700 border-gray-600 rounded"
          />
          <label htmlFor="terms" className="text-sm text-gray-200 pl-2">
            I agree to the{" "}
            <a
              href="#"
              className="text-purple-400 underline hover:text-purple-300 transition-colors"
            >
              Terms & Conditions
            </a>
          </label>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-purple-400 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-[1.02]"
      >
        {mode === "signup" ? "Create account" : "Login"}
      </button>
    </form>
  );
};

export default LoginFrom;
