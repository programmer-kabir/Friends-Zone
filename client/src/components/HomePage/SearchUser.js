import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const SearchUser = ({ setIsSearchModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!searchTerm.trim()) return setResults([]);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${
            process.env.NEXT_PUBLIC_LOCALHOST_LINK
          }/users/search?username=${encodeURIComponent(searchTerm)}`
        );
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    }, 500); // 0.5s debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white relative p-6 rounded-lg shadow-lg w-2/5 max-h-[80vh] overflow-y-auto">
        <button
          onClick={() => setIsSearchModal(false)}
          className="absolute top-3 right-3 cursor-pointer"
        >
          <IoClose size={32} />
        </button>

        <h2 className="text-2xl font-medium mt-4 pb-3">Search Users</h2>
        <input
          type="text"
          placeholder="Type username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 text-lg px-3 py-2 w-full rounded outline-none text-[#344258] border-[#E7E5E4]"
        />

        {results.length === 0 && searchTerm && (
          <p className="text-gray-500 mt-4 text-center">No users found</p>
        )}

        <div className="mt-4 space-y-2">
          {results.map((user) => (
            <Link
              href={`/profiles/${user.userName}`}
              key={user._id}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => setIsSearchModal(false)}
            >
              <Image
                src={user.image}
                alt={user.name}
                width={10}
                height={10}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-500">@{user.userName}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
