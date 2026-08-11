import { useReducer } from "react"
import { useState, useEffect, createContext, useContext } from "react"
import { canvasInstanceReducer, pdfReducer } from "./canvasReducer"
import { getPdf } from "../services/pdfs"
import { useRef } from "react"

const CanvasContext = createContext()
const initStateCanvas = {
    canvas: null,
    dimensions:{w: 1300, h:450},
    undoStack: [],
    redoStack: [],
}
const initStatePdf = {
    pdf: null
}


export function CanvasProvider({children}){
    const [canvasState, dispatchCanvas] = useReducer(canvasInstanceReducer, initStateCanvas)
    const [pdfState, dispatchPdf] = useReducer(pdfReducer, initStatePdf)
    const { canvas  } = canvasState
    const { pdf }= pdfState
    const [pdfUrl, setPdfUrl] = useState(null)
    const hiddenCanvasRef = useRef()

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

    const canvasInfo = {
        setCanvasSize: (width, height)=> {setCanvas('SET_DIMENSIONS', {width, height})},
        canvas: canvas,
        setCanvas: (canvas)=> {setCanvas('SET_CANVAS', canvas)},
        saveHistory: (canvasInstance)=> {
            const json = JSON.stringify(canvasInstance.toJSON())
            setCanvas('SAVE_HISTORY', json)
        },
        undo: ()=>{setCanvas('UNDO')},
        redo: ()=>{setCanvas('REDO')},
        uploadPdf: (url)=> {setPDF(url)},
        pdf,
        pdfUrl,
        hiddenCanvasRef,
        resetPdf: ()=> {dispatchPdf({type:'RESET_PDF', payload: null})},
    }
    return (
        <CanvasContext value={canvasInfo}>
            {children}
        </CanvasContext>
    )
}

export const useCanvas = ()=> useContext(CanvasContext)