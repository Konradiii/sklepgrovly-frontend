"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
    isLoggedIn: boolean;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}:{children:ReactNode}){


    const[isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(()=>{
        const token = localStorage.getItem("accessToken");
        if (token) {
            setIsLoggedIn(true)
        }
    }, []);

    const login = (accessToken:string, refreshToken:string) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken",refreshToken);
        setIsLoggedIn(true);
    }
    const logout = ()=>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
    };
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>

    );
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error("useAuth musi być użyty wewnątrz AuthProvider");
    }
    return context;
}