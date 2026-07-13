import { useReducer } from "react"
import { useState, useEffect, createContext, useContext } from "react"
import { canvasInstanceReducer, canvasSettingsReducer, pdfReducer } from "./canvasReducer"

const CanvasContext = createContext()
const initStateSettings = {
    brushColor:'#000000',
    brushSize: 5,
}
const initStateCanvas = {
    canvas: null,
    dimensions: {w: 1300, h: 550},
    undoStack: [],
    redoStack: [],
    isSelection: false
}
const initStatePdf = {
    pages: []
}


export function CanvasProvider({children}){
    const [stateSettings, dispatchSetting] = useReducer(canvasSettingsReducer, initStateSettings)
    const [canvasState, dispatchCanvas] = useReducer(canvasInstanceReducer, initStateCanvas)
    const [pdfState, dispatchPdf] = useReducer(pdfReducer, initStatePdf)
    console.log(pdfState);
    
    const {
        brushColor, 
        brushSize } = stateSettings
    const {
        canvas,
        dimensions,
        isSelection} = canvasState
    const {
        pages
    }= pdfState
    
    const setSettings = (type, payload)=> {
        dispatchSetting({type, payload})
    }
    const setCanvas = (type, payload)=> {
        dispatchCanvas({type, payload})
    }
    const setPDF = (type, payload)=> {
        dispatchPdf({type, payload})
    }

    const canvasInfo = {
        brushColor:brushColor,
        setBrushColor: (color)=> {setSettings('SET_BRUSH_COLOR', color)},
        brushSize: brushSize,
        setBrushSize: (size) => {setSettings('SET_BRUSH_SIZE', size)},
        canvasSize: dimensions,
        setCanvasSize: (width, height)=> {setCanvas('SET_DIMENSIONS', {width, height})},
        undo: ()=> {setCanvas('UNDO', canvasState)},
        redo: ()=> {setCanvas('REDO', canvasState)},
        canvas: canvas,
        setCanvas: (canvas)=> {setCanvas('SET_CANVAS', canvas)},
        saveHistory: (canvas)=> {
            const json = JSON.stringify(canvas.toJSON())
            setCanvas('SAVE_HISTORY', json)
        },
        selectMode: (isSelection)=> {setCanvas('SELECT_MODE', isSelection)},
        isSelectionMode: isSelection,
        deleteSelection : () => {setCanvas('DELETE', canvasState)},
        loadBgImg: (imageUrl)=> {setCanvas('LOAD_BG', imageUrl)},
        convertPdf: (file)=> {setPDF('UPLOAD_PDF', file)},
        pdfPages: pages

    }
    return (
        <CanvasContext value={canvasInfo}>
            {children}
        </CanvasContext>
    )
}

export const useCanvas = ()=> useContext(CanvasContext)