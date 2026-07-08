import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";

const CanvasContext = createContext()

export function CanvasProvider({children}){
    const [brushColor, setBrushColor] = useState('#000')
    const [brushSize, setBrushSize] = useState('5')
    const [canvasSize, setCanvasSize] = useState({w: 1300, h: 550})
    const [canvas, setCanvas] = useState(null)

    const undo = (canvas) => {    
        if(canvas){
            const objects = canvas.getObjects()
            if(objects.length > 0){
                canvas.remove(objects[objects.length-1])
                canvas.renderAll()
            }
        }
    }
    const canvasInfo = {
        brushColor,
        setBrushColor,
        brushSize,
        setBrushSize,
        canvasSize,
        undo,
        canvas,
        setCanvas
    }
    return (
        <CanvasContext value={canvasInfo}>
            {children}
        </CanvasContext>
    )
}

export const useCanvas = ()=> useContext(CanvasContext)