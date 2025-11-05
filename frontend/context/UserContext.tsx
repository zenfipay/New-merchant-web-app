"use client"

import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/types";
import { mockUserData } from "@/lib/data";

interface UserContextType {
    user: User;
    setUser: ( user: User ) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {

    const [ user, setUser ] = useState<User>(mockUserData[0])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if(!context) {
        throw new Error("useUser must be used within UserProvider")
    }
    return context;
}