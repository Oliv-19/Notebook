import { useState, useEffect, useRef} from "react"
import { useCanvas } from "./CanvasContext"
import * as fabric from 'fabric'

export function Canvas(){
    const canvasRef = useRef(null)
    const {brushColor, brushSize, canvasSize} = useCanvas()
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(()=> {
        const canvas = new fabric.Canvas(canvasRef.current, {
            width: canvasSize.w,
            height: canvasSize.h,
            isDrawingMode:true
        }) 
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
        canvas.freeDrawingBrush.color = brushColor
        canvas.freeDrawingBrush.width = brushSize
        
        return () => {canvas.dispose()}
    },[brushColor, brushSize])

    return (
        <>
        <div className="">
            <canvas ref={canvasRef}/>
        </div> 
        </>
    )
}