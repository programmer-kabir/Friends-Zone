"use client";

import { useState } from "react";
import image from '@/public/asset/sign-up.jpg'
import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const SignUP = () => {
     const [showPassword, setShowPassword] = useState(false);
     
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
    const handleSubmit = (e) => {
    e.preventDefault();
    alert("This is a demo signup form. In a real application, this would create your account!");
  };
    const handleSocialLogin = (provider) => {
    alert(`This is a demo. In a real application, this would sign you up with ${provider}!`);
  };
  return (
    <div className="min-h-screen bg-[#2C2638] flex gap-20 p-5">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <Image src={image} alt="sign up page " className="rounded-2xl"/>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center ">
        <div className="w-full">
        
            {/* Header */}
            <div className="">
              <h2 className="text-4xl font-bold text-white mb-2">Create an account</h2>
              <p className="text-gray-400 pt-5">
                Already have an account?{" "}
                <Link href="signin" className="text-purple-400 underline hover:text-purple-300 transition-colors">
                  Log in
                </Link>
              </p>
            </div>

            {/* Form */}
            <form className="pt-5 space-y-4" onSubmit={handleSubmit}>
                {/* First & Last Name */}
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
                     <FaEye className="w-5 h-5"/>
                    ) : (
                    <FaEyeSlash className="w-5 h-5"/>
                    )}
                  </button>
                </div>
              

              <div className="flex items-start ">
                <input
                  type="checkbox"
                  id="terms"
                  className="pt-0.5 w-4 h-4 text-purple-400 bg-gray-700 border-gray-600 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-200 pl-2">
                  I agree to the{" "}
                  <a href="#" className="text-purple-400 underline hover:text-purple-300 transition-colors">
                    Terms & Conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-400 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-[1.02]"
              >
                Create account
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-800 text-gray-400">Or register with</span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="submit"
                  name="action"
                  value="google"
                  onClick={() => handleSocialLogin("Google")}
                  className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <FcGoogle className="w-5 h-5 mr-2"/>
                  Google
                </button>
                <button
                  type="submit"
                  name="action"
                  value="google"
                  onClick={() => handleSocialLogin("Google")}
                  className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <FcGoogle className="w-5 h-5 mr-2"/>
                  Google
                </button>
                

              </div>
            </form>
          
        </div>
      </div>
    </div>
  )
}

export default SignUP