import image from '@/public/asset/sign-up.jpg'
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { doSocialLogin } from "../actions";
import LoginFrom from '@/src/components/LoginFrom';
import SocialLogin from '@/src/components/SocialLogin';

const SignUP = () => {

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

            <LoginFrom mode='signup'/>
           {/* <SocialLogin mode="signup"/> */}
           
          
        </div>
      </div>
    </div>
  )
}

export default SignUP