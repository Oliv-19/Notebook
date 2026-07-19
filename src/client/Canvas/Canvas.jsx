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
    const isExpanding = useRef(false)
    const {
        undo, 
        redo,
        canvas, 
        setCanvas,
        saveHistory,
        selectMode,
        deleteSelection,
        pdf,
        resizeCanvas
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
                isDrawingMode:true,
                enableRetinaScaling: true,
            }) 
            fabricCanvas.setDimensions({
                width:1300, 
                height: 2000
            })
            configureCanvas(fabricCanvas, saveHistory)
            setCanvas(fabricCanvas) 
            if(savedCanvas){
                
                fabricCanvas.loadFromJSON(savedCanvas, (obj)=> {
                    fabricCanvas.renderAll()
                    fabricCanvas.requestRenderAll()
                },)
            }
            return () => {
                if(canvas) canvas.dispose()
            }   
        }
        initCanvas()
    }, [])

    const handleScroll = (e) => {
        if (isExpanding.current) return;
        
        const container = e.target
        const isNearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 200
        if (isNearBottom) {
            isExpanding.current = true
            if (!canvas) return
            const extraHeight = 1000
            const newHeight = canvas.getHeight() + extraHeight

            canvas.setDimensions({
                width: canvas.getWidth(),
                height: newHeight
            })
            canvas.renderAll()
            setTimeout(() => { isExpanding.current = false; }, 500)
        }
    }

    return (
        <>
        <div onScroll={handleScroll} className={`h-screen w-full overflow-y-scroll 
            transition-all duration-500 flex justify-end`}>
            <canvas className="border-2" ref={canvasRef}/>
        </div> 
        </>
    )
}