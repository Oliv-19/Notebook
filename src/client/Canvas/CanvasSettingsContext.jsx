import { useReducer, useEffect, createContext, useContext } from "react"
import { canvasSettingsReducer } from "./canvasReducer"
import { useCanvas } from "./CanvasContext"
import * as fabric from 'fabric'

const CanvasSettingsContext = createContext()
const initStateSettings = {
    brushColor:'#000000',
    backgroundTheme: {bg: '#ffffff', lines: '#e0e0e0'},
    brushSize: 2,
    backgroundPattern: 'none'
}

export function CanvasSettingsProvider({children}){
    const {canvas, hiddenCanvasRef} = useCanvas()
    const [stateSettings, dispatchSetting] = useReducer(canvasSettingsReducer, initStateSettings)
    
    const {
        brushColor, 
        brushSize,
        backgroundPattern,
        backgroundTheme } = stateSettings
    
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
        backgroundPattern,
        setBackgroundPattern: (style, theme) => {setSettings('SET_BACKGROUND_STYLE', {style, theme, canvas, hiddenCanvas: hiddenCanvasRef.current})},
    }
    return (
        <CanvasSettingsContext value={settings}>
            {children}
        </CanvasSettingsContext>
    )
}

export const useCanvasSettings = ()=> useContext(CanvasSettingsContext)