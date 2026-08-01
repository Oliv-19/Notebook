import { useNavigate } from "react-router"
import { useAuth } from "../AuthContext"
import { useCanvas } from "../Canvas/CanvasContext"
import { saveCanvas } from "../services/canvas"
import { getCurrNotebook } from "../services/notebooks"
import { savePdf } from "../services/pdfs"

export function SaveButton(){
    const {canvas, pdfUrl} = useCanvas()
    const { user } = useAuth()
    const navigate = useNavigate()
    
    const save = async()=> {
        if(!user) navigate('/login')
        const notebook = getCurrNotebook()
        await saveCanvas(canvas, notebook.id)
        if(pdfUrl && pdfUrl.type !== 'application/pdf'){
            await savePdf(pdfUrl, notebook.id)
        }
    }
    return (
        <>
        <button onClick={save}>Save</button>
        </>
    )
}