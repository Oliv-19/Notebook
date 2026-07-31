import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { checkCredentials, logout } from "./services/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getUserNotebooks } from "./services/notebooks";

const AuthContext = createContext()

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const loginUser = async(user)=> {
        setUser(user)
    }
    const logoutUser = async()=> {
        await logout()
        setUser(null)
        navigate('/')
    }
    useEffect(()=> {
        const checkForUser = async ()=> {
            const logged = await checkCredentials()
            if(logged?.loggedIn) {
                setUser(logged.id)
                setIsLoading(false)
            } else {
                logoutUser()
                setIsLoading(false)
            }
        }
        checkForUser()
    }, [])

    const value = {
        user: user,
        loginUser,
        logoutUser,
        isLoading
    }

    return <AuthContext value={value}>
        {children}
    </AuthContext>
}

export const useAuth = ()=> useContext(AuthContext)