import { useAuth } from "../AuthContext"

export function LogoutButton(){
    const {user, logoutUser} = useAuth()
    return (
        <>
        {user && <button onClick={logoutUser}>logout</button>}
        </>
    )
}