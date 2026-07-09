import { useReducer } from "react"
import { useState, useEffect, createContext, useContext } from "react"
import { canvasReducer } from "./canvasReducer"

const CanvasContext = createContext()
const initialState = {
    brushColor:'#000000',
    brushSize: 5,
    canvas: null,
    undoStack: [],
    redoStack: []
}

export function CanvasProvider({children}){
    const [canvasSize, setCanvasSize] = useState({w: 1300, h: 550})
    const [state, dispatch] = useReducer(canvasReducer, initialState)
    const {
        brushColor, 
        brushSize, 
        canvas} = state
    const setFunction = (type, payload)=> {
        dispatch({type, payload})
    }

    const canvasInfo = {
        brushColor:brushColor,
        setBrushColor: (color)=> {setFunction('SET_BRUSH_COLOR', color)},
        brushSize: brushSize,
        setBrushSize: (size) => {setFunction('SET_BRUSH_SIZE', size)},
        canvasSize,
        undo: ()=> {setFunction('UNDO', state)},
        redo: ()=> {setFunction('REDO', state)},
        canvas: canvas,
        setCanvas: (canvas)=> {setFunction('SET_CANVAS', canvas)},
        saveHistory: (canvas)=> {
            const json = JSON.stringify(canvas.toJSON())
            setFunction('SAVE_HISTORY', json)
        }
    }
    return (
        <CanvasContext value={canvasInfo}>
            {children}
        </CanvasContext>
    )
}

export const useCanvas = ()=> useContext(CanvasContext)