import { useEffect, useRef} from "react"
import { useCanvas } from "./CanvasContext"
import * as fabric from 'fabric'
import { useShortcut } from "../hooks/index"
import { getCanvas } from "../services/canvas"

function configureCanvas(canvas, saveHistory){
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
    canvas.freeDrawingBrush.decimate = 8
    canvas.freeDrawingBrush.color = '#000000'
    canvas.freeDrawingBrush.width = 5
    canvas.freeDrawingBrush.strokeLineCap = 'round'
    canvas.freeDrawingBrush.strokeLineJoin = 'round'
    canvas.on('path:created', (e)=> {
        const path = e.path
        path.set({
            selectable: true,
            evented: true
        })
        saveHistory(canvas)
    })
}

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
        const initCanvas = async()=>{
            const savedCanvas = await getCanvas()
            
            const dpr = window.devicePixelRatio
            const fabricCanvas = new fabric.Canvas(canvasRef.current, {
                width: 1300,
                height: 550,
                isDrawingMode:true,
                enableRetinaScaling: true,
            }) 
            fabricCanvas.setZoom(dpr)
            configureCanvas(fabricCanvas, saveHistory)
            setCanvas(fabricCanvas) 
            if(savedCanvas){
                fabricCanvas.loadFromJSON(savedCanvas, ()=> {
                    fabricCanvas.renderAll()
                    fabricCanvas.requestRenderAll()
                })
            }
            return () => {
                if(canvas) canvas.dispose()
            }   
        }
        initCanvas()
    }, [])

    return (
        <>
        <div className="">
            <canvas className="border-2" ref={canvasRef}/>
        </div> 
        </>
    )
}