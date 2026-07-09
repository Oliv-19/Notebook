import { useReducer } from "react"
import { useState, useEffect, createContext, useContext } from "react"
import { canvasInstanceReducer, canvasSettingsReducer } from "./canvasReducer"

const CanvasContext = createContext()
const initStateSettings = {
    brushColor:'#000000',
    brushSize: 5,
}
const initStateCanvas = {
    canvas: null,
    undoStack: [],
    redoStack: [],
    isSelection: false
}


export function CanvasProvider({children}){
    const [canvasSize, setCanvasSize] = useState({w: 1300, h: 550})
    const [stateSettings, dispatchSetting] = useReducer(canvasSettingsReducer, initStateSettings)
    const [canvasState, dispatchCanvas] = useReducer(canvasInstanceReducer, initStateCanvas)
    
    const {
        brushColor, 
        brushSize } = stateSettings
    const {
        canvas,
        isSelection} = canvasState
    const setSettings = (type, payload)=> {
        dispatchSetting({type, payload})
    }
    const setCanvas = (type, payload)=> {
        dispatchCanvas({type, payload})
    }

    const canvasInfo = {
        brushColor:brushColor,
        setBrushColor: (color)=> {setSettings('SET_BRUSH_COLOR', color)},
        brushSize: brushSize,
        setBrushSize: (size) => {setSettings('SET_BRUSH_SIZE', size)},
        canvasSize,
        undo: ()=> {setCanvas('UNDO', canvasState)},
        redo: ()=> {setCanvas('REDO', canvasState)},
        canvas: canvas,
        setCanvas: (canvas)=> {setCanvas('SET_CANVAS', canvas)},
        saveHistory: (canvas)=> {
            const json = JSON.stringify(canvas.toJSON())
            setCanvas('SAVE_HISTORY', json)
        },
        selectMode: (isSelection)=> {setCanvas('SELECT_MODE', isSelection)},
        isSelectionMode: isSelection
    }
    return (
        <CanvasContext value={canvasInfo}>
            {children}
        </CanvasContext>
    )
}

export const useCanvas = ()=> useContext(CanvasContext)