"use client";
import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children, value }) => {
  const [user, setUser] = useState(value || null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext)?.user;
