import { useReducer, useEffect, createContext, useContext } from "react"
import { canvasSettingsReducer } from "./canvasReducer"
import { useCanvas } from "./CanvasContext"
import * as fabric from 'fabric'

const CanvasSettingsContext = createContext()
const initStateSettings = {
    brushColor:'#000000',
    brushSize: 5,
}

export function CanvasSettingsProvider({children}){
    const {canvas} = useCanvas()
    const [stateSettings, dispatchSetting] = useReducer(canvasSettingsReducer, initStateSettings)
    
    const {
        brushColor, 
        brushSize } = stateSettings
    
    const setSettings = (type, payload)=> {
        dispatchSetting({type, payload})
    }
    useEffect(()=> {
        if(canvas){
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
            canvas.freeDrawingBrush.color = brushColor
            canvas.freeDrawingBrush.width = parseInt(brushSize, 10) 
        }
    },[brushColor, brushSize])

    const settings = {
        brushColor,
        setBrushColor: (color)=> {setSettings('SET_BRUSH_COLOR', color)},
        brushSize,
        setBrushSize: (size) => {setSettings('SET_BRUSH_SIZE', size)},
    }
    return (
        <CanvasSettingsContext value={settings}>
            {children}
        </CanvasSettingsContext>
    )
}

export const useCanvasSettings = ()=> useContext(CanvasSettingsContext)