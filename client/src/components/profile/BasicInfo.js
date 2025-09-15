import { useUser } from '@/src/context/UserContext';
import React from 'react';
import { IoMdMail } from 'react-icons/io';

const BasicInfo = ({user}) => {


    return (
        <div
            className="px-4 py-5 mt-5 rounded space-y-3"
            style={{
              boxShadow:
                "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
            }}
          >
            {/* Email */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-500">{user?.email}</p>
              </div>
              <IoMdMail color="gray" size={20} />
            </div>
            {/* Address */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-500">
                  {user?.address ? (
                    user?.address
                  ) : (
                    <button>Set Your Address</button>
                  )}
                </p>
              </div>
              <IoMdMail color="gray" size={20} />
            </div>
          </div>
    );
};

export default BasicInfo;