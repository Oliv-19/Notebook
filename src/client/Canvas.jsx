import { useState, useEffect, useRef} from "react"
import { useCanvas } from "./CanvasContext"
import * as fabric from 'fabric'

export function Canvas(){
    const canvasRef = useRef(null)
    const {brushColor, brushSize, canvasSize, undo, canvas, setCanvas} = useCanvas()

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
        
        const handleKeyDown = e => {
            if((e.ctrlKey || e.metaKey) && e.key == 'z'){
                e.preventDefault()
                undo(fabricCanvas)
            }
        }
        document.addEventListener('keydown',handleKeyDown )
        
        return () => {
            fabricCanvas.dispose()
            document.removeEventListener('keydown',handleKeyDown ) 
        }
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