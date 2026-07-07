import { useState, useEffect, useRef} from "react"
import { useCanvas } from "./CanvasContext"
import * as fabric from 'fabric'

export function Canvas(){
    const canvasRef = useRef(null)
    const {brushColor, brushSize, canvasSize} = useCanvas()
    const [canvas, setCanvas] = useState(null)

    useEffect(()=> {
        const dpr = window.devicePixelRatio
        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
            width: canvasSize.w * dpr,
            height: canvasSize.h * dpr,
            isDrawingMode:true,
            enableRetinaScaling: true,
        }) 
        fabricCanvas.setZoom(dpr)
        fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas)
        fabricCanvas.freeDrawingBrush.decimate = 8
        fabricCanvas.freeDrawingBrush.color = brushColor
        fabricCanvas.freeDrawingBrush.width = parseInt(brushSize, 10)
        fabricCanvas.freeDrawingBrush.strokeLineCap = 'round'
        fabricCanvas.freeDrawingBrush.strokeLineJoin = 'round'
        setCanvas(fabricCanvas)
        
        return () => {fabricCanvas.dispose()}
    },[])
    
    useEffect(()=> {
        if(canvas){
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
            canvas.freeDrawingBrush.color = brushColor
            canvas.freeDrawingBrush.width = parseInt(brushSize, 10)
        }

    },[brushColor, brushSize])

    return (
        <>
        <div className="">
            <canvas ref={canvasRef}/>
        </div> 
        </>
    )
}