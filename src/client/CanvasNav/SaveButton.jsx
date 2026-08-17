import { useNavigate } from "react-router"
import { useAuth } from "../AuthContext"
import { useCanvas } from "../Canvas/CanvasContext"
import { Modal } from "../Notebooks/Modal"
import { saveCanvas } from "../services/canvas"
import { getCurrNotebook } from "../services/notebooks"
import { savePdf } from "../services/pdfs"
import { useCanvasSettings } from "../Canvas/CanvasSettingsContext"
import { useState } from "react"

export function SaveButton(){
    const {canvas, pdfUrl} = useCanvas()
    const [isSaved, setIsSaved] = useState(true)
    const {backgroundTheme, backgroundPattern} = useCanvasSettings()
    const { user } = useAuth()
    const navigate = useNavigate()
    
    const save = async()=> {
        if(!user) navigate('/login')
        const notebook = getCurrNotebook()
        const finalData = {
            canvas: canvas.toJSON(),
            metadata : {
                backgroundType: backgroundPattern,
                backgroundTheme: backgroundTheme
            }
        }
        const saved= await saveCanvas(finalData, notebook.id)
        if(!saved || saved.success == false){
            setIsSaved(false)
        }
        
        if(pdfUrl && pdfUrl.type !== 'application/pdf'){
            await savePdf(pdfUrl, notebook.id)
        }
    }
    if(!isSaved){
        return <>
            <Modal close={()=>{setIsSaved(true)}}>
                <div className='p-5'>
                    Error saving changes
                </div>
            </Modal>
        </> 
    }
    return (
        <>
        <button onClick={save} className="optionStyle">Save</button>
        </>
    )
}