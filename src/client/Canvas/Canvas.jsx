import { useEffect, useRef} from "react"
import { useCanvas } from "./CanvasContext"
import * as fabric from 'fabric'
import { useShortcut } from "../hooks/index"

export function Canvas(){
    const canvasRef = useRef(null)
    const {
        undo, 
        redo,
        canvas, 
        setCanvas,
        saveHistory,
        selectMode,
        deleteSelection
    } = useCanvas()
    const keyDownMap= {
        'ctrl+z': ()=>{undo(canvas)},
        'ctrl+y': ()=>{redo(canvas)},
        'v': ()=>{selectMode(true)},
        'b': ()=>{selectMode(false)},
        'Delete': ()=>{deleteSelection()},
    }
    useShortcut(keyDownMap)

    useEffect(()=> {
        const dpr = window.devicePixelRatio
        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
            width: 1300 * dpr,
            height: 550 * dpr,
            isDrawingMode:true,
            enableRetinaScaling: true,
        }) 
        fabricCanvas.setZoom(dpr)
        fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas)
        fabricCanvas.freeDrawingBrush.decimate = 8
        fabricCanvas.freeDrawingBrush.color = '#000000'
        fabricCanvas.freeDrawingBrush.width = 5
        fabricCanvas.freeDrawingBrush.strokeLineCap = 'round'
        fabricCanvas.freeDrawingBrush.strokeLineJoin = 'round'
        setCanvas(fabricCanvas)
        fabricCanvas.on('path:created', (e)=> {
            const path = e.path
            path.set({
                selectable: true,
                evented: true
            })
            saveHistory(fabricCanvas)
        })
        
        return () => {
            fabricCanvas.dispose()
        }
    },[])

    return (
        <>
        <div className="">
            <canvas className="border-2" ref={canvasRef}/>
        </div> 
        </>
    )
}