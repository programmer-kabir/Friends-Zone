import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { doSocialLogin } from '../app/actions';

const SocialLogin = ({ mode = "signup" }) => {
    return (
       <form action={doSocialLogin}>
                {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                   {mode === "signup" && (
                  <span className="px-4 bg-gray-800 text-gray-400">
                  Or register with
                    </span>
                   )}
                   {mode === "signin" && (
                  <span className="px-4 bg-gray-800 text-gray-400">
                  Or Login with
                    </span>
                   )}
                </div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="submit"
                  name="action"
                  value="google"
                  className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <FcGoogle className="w-5 h-5 mr-2"/>
                  Google
                </button>
                <button
                  type="submit"
                  name="action"
                  value="google"
                  className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <FcGoogle className="w-5 h-5 mr-2"/>
                  Google
                </button>
                

              </div>
            </form>
    );
};

export default SocialLogin;