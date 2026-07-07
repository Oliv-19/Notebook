import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import CanvasDraw from "react-canvas-draw"
import { useCanvas } from "./CanvasContext"

export function Canvas(){
   const {brushColor, brushSize, canvasSize} = useCanvas()
    
    return (
        <>
        <div className="">
            <CanvasDraw
            brushColor={brushColor}
            brushRadius={brushSize}
            canvasWidth={canvasSize.w}
            canvasHeight={canvasSize.h}
            />
        </div> 
        </>
    )
}