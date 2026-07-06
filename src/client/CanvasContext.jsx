import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

const CanvasContext = createContext()

export function CanvasProvider({children}){
    const [brushColor, setBrushColor] = useState('#000')

    const canvasInfo = {
        brushColor,
        setBrushColor
    }
    return (
        <CanvasContext value={canvasInfo}>
            {children}
        </CanvasContext>
    )
}

export const useCanvas = ()=> useContext(CanvasContext)