import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

const CanvasContext = createContext()

export function CanvasProvider({children}){
    const [brushColor, setBrushColor] = useState('#000')
    const [brushSize, setBrushSize] = useState('5')
    const [canvasSize, setCanvasSize] = useState({w: 1300, h: 550})

    const canvasInfo = {
        brushColor,
        setBrushColor,
        brushSize,
        setBrushSize,
        canvasSize
    }
    return (
        <CanvasContext value={canvasInfo}>
            {children}
        </CanvasContext>
    )
}

export const useCanvas = ()=> useContext(CanvasContext)