import { useReducer } from "react"
import { useState, useEffect, createContext, useContext } from "react"
import { canvasInstanceReducer, pdfReducer } from "./canvasReducer"
import { getPdf } from "../services/pdfs"
import { useLocation } from "react-router"

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
    const location = useLocation()
    const { canvas, isSelection} = canvasState
    const { pdf }= pdfState
    const [pdfUrl, setPdfUrl] = useState(null)
    const setCanvas = (type, payload)=> {
        dispatchCanvas({type, payload})
    }
    const setPDF = async(url)=> {
        URL.revokeObjectURL(pdf)
        setPdfUrl(url)
        if(url.type !== 'application/pdf'){
            const blob =await getPdf(url)
            dispatchPdf({type:'UPLOAD_PDF', payload: blob})
            
        }else{
            dispatchPdf({type:'UPLOAD_PDF', payload: url})

        }
    }
    
    useEffect(()=> {
        if(canvas) {
            if(pdf){
                
                const width = window.screen.width / 2
                const height = canvas.height
                setCanvas('SET_DIMENSIONS', {width:width+50, height:height})
                canvas.renderAll()
            }
        }
    }, [pdf, canvas])

    const events= {
        undo: {shortcut: 'ctrl+z', callback: ()=>{setCanvas('UNDO', canvasState)} },
        redo: {shortcut: 'ctrl+y', callback: ()=>{setCanvas('REDO', canvasState)} },
        select: {shortcut: 'v', callback: ()=>{setCanvas('SELECT_MODE', true)} },
        draw: {shortcut: 'b', callback: ()=>{setCanvas('SELECT_MODE', false)} },
        delete: {shortcut: 'Delete', callback: ()=>{setCanvas('DELETE', canvasState)} },
    }

    const canvasInfo = {
        setCanvasSize: (width, height)=> {setCanvas('SET_DIMENSIONS', {width, height})},
        canvas: canvas,
        setCanvas: (canvas)=> {setCanvas('SET_CANVAS', canvas)},
        saveHistory: (canvas)=> {
            const json = JSON.stringify(canvas.toJSON())
            setCanvas('SAVE_HISTORY', json)
        },
        isSelectionMode: isSelection,
        uploadPdf: (url)=> {setPDF(url)},
        uploadImg: (data, hiddenCanvas)=> {setCanvas('UPLOAD_IMG', {data, hiddenCanvas})},
        pdf,
        pdfUrl,
        resetPdf: ()=> {dispatchPdf({type:'RESET_PDF', payload: null})},
        events
    }
    return (
        <CanvasContext value={canvasInfo}>
            {children}
        </CanvasContext>
    )
}

export const useCanvas = ()=> useContext(CanvasContext)