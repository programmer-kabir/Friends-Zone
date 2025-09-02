"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const LoginFrom = ({ mode = "signup" }) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePassword = () => setShowPassword(!showPassword);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");
      if (mode === "signup") {
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const name = firstName + " " + lastName;
        console.log(name, email, password);
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
            
        });
        response.status === 201 && router.push('/');
      } else if (mode === "signin") {
        console.log("Signin data");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <form className="pt-5 space-y-4" onSubmit={handleSubmit}>
      {mode === "signup" && (
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
