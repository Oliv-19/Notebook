import { useNavigate } from "react-router"
import { useAuth } from "../AuthContext"
import { useCanvas } from "../Canvas/CanvasContext"
import { Modal } from "../Notebooks/Modal"
import { saveCanvas } from "../services/canvas"
import { getCurrNotebook } from "../services/notebooks"
import { savePdf } from "../services/pdfs"
import { useCanvasSettings } from "../Canvas/CanvasSettingsContext"
import { useState } from "react"

function optimizeCanvasJson(canvasJson) {
    if(!canvasJson || !canvasJson.objects ) return canvasJson
    
    const cleanedJson = canvasJson.objects.map((obj)=>{
        const  cleanedObj= {
            type: obj.type,
            version: obj.version,
            top: obj.top,
            left: obj.left,
            width: obj.width,
            height: obj.height,
            fill: obj.fill,
            stroke: obj.stroke,
            strokeWidth: obj.strokeWidth,
            path: obj.path,
            src: obj.src
        }
        obj.originX !== 'left' && ( obj.originX = cleanedObj.originX )
        obj.originY !== 'top' && ( obj.originY = cleanedObj.originY )
        obj.opacity !== 1 && ( obj.opacity = cleanedObj.opacity )
        obj.visible !== true && ( obj.visible = cleanedObj.visible )
        obj.selectable !== true && ( obj.selectable = cleanedObj.selectable )
        obj.evented !== true && ( obj.evented = cleanedObj.evented )

        obj.scaleX !== 1 && ( obj.scaleX = cleanedObj.scaleX )
        obj.scaleY !== 1 && ( obj.scaleY = cleanedObj.scaleY )
        obj.angle !== 0 && ( obj.angle = cleanedObj.angle )
        obj.skewX !== 0 && ( obj.skewX = cleanedObj.skewX )
        obj.skewY !== 0 && ( obj.skewY = cleanedObj.skewY )
        obj.flipX !== false && ( obj.flipX = cleanedObj.flipX )
        obj.flipY !== false && ( obj.flipY = cleanedObj.flipY )
        return cleanedObj
    })
    return {background: canvasJson.background, version: canvasJson.version, objects: cleanedJson}
}

export function SaveButton(){
    const {canvas, pdfUrl} = useCanvas()
    const [isSaved, setIsSaved] = useState(true)
    const {backgroundTheme, backgroundPattern} = useCanvasSettings()
    const { user } = useAuth()
    const navigate = useNavigate()
    
    const save = async()=> {
        if(!user) navigate('/login')
        const notebook = getCurrNotebook()
        const rawCanvas = canvas.toJSON()
        const canvasJson = optimizeCanvasJson(rawCanvas)
        
        const finalData = {
            canvas: canvasJson,
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