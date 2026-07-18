import { useNavigate } from "react-router"
import { useAuth } from "../AuthContext"
import { useCanvas } from "../Canvas/CanvasContext"
import { saveCanvas } from "../services/canvas"

export function SaveButton(){
    const {canvas} = useCanvas()
    const { user } = useAuth()
    const navigate = useNavigate()
    
    const save = async()=> {
        if(!user) navigate('/login')
        await saveCanvas(canvas)
    }
    return (
        <>
        <button onClick={save}>Save</button>
        </>
    )
}