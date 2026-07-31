import { useContext } from "react"
import { createContext } from "react"
import { useAuth } from "../AuthContext"
import { useEffect } from "react"
import { useState } from "react"
import { getUserNotebooks } from "../services/notebooks"

const NotebookContext = createContext()

export function NotebookProvider({children}){
    const [userNotebooks, setUserNotebooks] = useState(null)
    const {user} = useAuth()
    const getNotebooks = async()=> {
        if(user){
            const notebooks = await getUserNotebooks()
            setUserNotebooks(notebooks)
        }
    }

    return <NotebookContext value={{
        userNotebooks: userNotebooks,
        getNotebooks: getNotebooks
    }}>
        {children}
    </NotebookContext>
}

export const useNotebooks = ()=> useContext(NotebookContext)