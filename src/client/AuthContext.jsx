import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { checkCredentials, logout } from "./services/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext()

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const loginUser = (user)=> {setUser(user)}
    const logoutUser = async()=> {
        await logout()
        setUser(null)
    }
    useEffect(()=> {
        const checkForUser = async ()=> {
            const logged = await checkCredentials()
            if(logged.loggedIn) {
                setUser(logged.id)
            } else {
                logoutUser()
                navigate('/')
            }
        }
        checkForUser()
    }, [])

    const value = {
        user: user,
        loginUser,
        logoutUser
    }

    return <AuthContext value={value}>
        {children}
    </AuthContext>
}

export const useAuth = ()=> useContext(AuthContext)