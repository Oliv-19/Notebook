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
        const cleanedObj = {...obj}
        if(cleanedObj.originX == 'left') delete cleanedObj.originX 
        if(cleanedObj.originY == 'top') delete cleanedObj.originY 
        if(cleanedObj.opacity == 1) delete cleanedObj.opacity 
        if(cleanedObj.visible == true) delete cleanedObj.visible
        if(cleanedObj.selectable == true) delete cleanedObj.selectable 
        if(cleanedObj.evented == true) delete cleanedObj.evented

        if(cleanedObj.hasControls == true) delete cleanedObj.hasControls
        if(cleanedObj.hasBorders == true) delete cleanedObj.hasBorders
        if(cleanedObj.lockScalingX == true) delete cleanedObj.lockScalingX
        if(cleanedObj.lockScalingY == true) delete cleanedObj.lockScalingY
        if(cleanedObj.lockRotation == true) delete cleanedObj.lockRotation
        if(cleanedObj.strokeDashOffset == 0) delete cleanedObj.strokeDashOffset
        if(cleanedObj.strokeLineCap == 'butt') delete cleanedObj.strokeLineCap
        if(cleanedObj.strokeLineJoin == 'miter') delete cleanedObj.strokeLineJoin
        if(cleanedObj.strokeMiterLimit == 4) delete cleanedObj.strokeMiterLimit
        if(cleanedObj.shadow == null) delete cleanedObj.shadow
        if(cleanedObj.clipPath == null) delete cleanedObj.clipPath
        if(cleanedObj.backgroundColor == null || cleanedObj.backgroundColor == '') delete cleanedObj.backgroundColor

        if(cleanedObj.scaleX == 1) delete cleanedObj.scaleX 
        if(cleanedObj.scaleY == 1) delete cleanedObj.scaleY 
        if(cleanedObj.angle == 0) delete cleanedObj.angle 
        if(cleanedObj.skewX == 0) delete cleanedObj.skewX
        if(cleanedObj.skewY == 0) delete cleanedObj.skewY 
        if(cleanedObj.flipX == false) delete cleanedObj.flipX 
        if(cleanedObj.flipY == false) delete cleanedObj.flipY 
        if (cleanedObj.styles && Object.keys(cleanedObj.styles).length === 0) {
            delete cleaned.styles;
        }
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