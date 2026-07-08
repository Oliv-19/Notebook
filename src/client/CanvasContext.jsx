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
    const [undoStack, setUndoStack] = useState([])
    const [redoStack, setRedoStack] = useState([])

    const undo = (canvas) => { 
        if(canvas){
            const objects = canvas.getObjects()
            if(objects.length > 0){
                const lastObj = objects[objects.length-1]
                setRedoStack(prev => [...prev, lastObj])
                canvas.remove(lastObj)
                canvas.renderAll()
            }
        }
    }

    const redo = (canvas) => { 
        if(canvas){
            if(redoStack.length > 0){
                const objToRestore = redoStack[redoStack.length-1]
                setRedoStack(prev => prev.slice(0, -1))
                canvas.add(objToRestore)
                canvas.renderAll()
            }
        }
    }

    const saveHistory = (canvas) => {
        const json = JSON.stringify(canvas.toJSON())
        setUndoStack(prev => [...prev, json])
        setRedoStack([])
    }

    const canvasInfo = {
        brushColor,
        setBrushColor,
        brushSize,
        setBrushSize,
        canvasSize,
        undo,
        redo,
        canvas,
        setCanvas,
        setUndoStack,
        setRedoStack,
        saveHistory
    }
    return (
        <CanvasContext value={canvasInfo}>
            {children}
        </CanvasContext>
    )
}

export const useCanvas = ()=> useContext(CanvasContext)