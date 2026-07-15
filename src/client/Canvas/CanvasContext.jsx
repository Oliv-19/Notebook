import { useReducer } from "react"
import { useState, useEffect, createContext, useContext } from "react"
import { canvasInstanceReducer, pdfReducer } from "./canvasReducer"

const CanvasContext = createContext()
const initStateCanvas = {
    canvas: null,
    dimensions:{w: 1300, h:450},
    currentTop: 450,
    undoStack: [],
    redoStack: [],
    isSelection: false
}
const initStatePdf = {
    pdf: null
}


export function CanvasProvider({children}){
    const [canvasState, dispatchCanvas] = useReducer(canvasInstanceReducer, initStateCanvas)
    const [pdfState, dispatchPdf] = useReducer(pdfReducer, initStatePdf)
    
    const { canvas, isSelection} = canvasState
    const { pdf }= pdfState
    
    const setCanvas = (type, payload)=> {
        dispatchCanvas({type, payload})
    }
    const setPDF = (type, payload)=> {
        dispatchPdf({type, payload})
    }

    const canvasInfo = {
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
        uploadPdf: (url)=> {setPDF('UPLOAD_PDF', url)},
        pdf
    }
    return (
        <CanvasContext value={canvasInfo}>
            {children}
        </CanvasContext>
    )
}

export const useCanvas = ()=> useContext(CanvasContext)