import { useEffect, useRef} from "react"
import { useCanvas } from "./CanvasContext"
import * as fabric from 'fabric'
import { useShortcut } from "../hooks/index"
import { getCanvas } from "../services/canvas"
import { getCurrNotebook } from "../services/notebooks"
import { useCanvasActions } from "./CanvasActionsContext"

function configureCanvas(canvas, canvasInfo){
    const { saveHistory } = canvasInfo
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

async function initCanvas(canvasRef, fabricCanvasRef, canvasInfo){
    const notebook =  getCurrNotebook()
    const { setCanvas } = canvasInfo
    const dpr = window.devicePixelRatio
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode:true,
        enableRetinaScaling: true,
    }) 
    fabricCanvas.setDimensions({
        width: window.innerWidth -15, 
        height: 2000
    })
    fabricCanvasRef.current=fabricCanvas
    configureCanvas(fabricCanvas, canvasInfo)
    setCanvas(fabricCanvas) 
    if(notebook){
        const savedObj = await getCanvas(notebook.id)
        if(savedObj){
            const {savedCanvas, pdf} = savedObj
            pdf && uploadPdf(pdf)
            savedCanvas && fabricCanvas.loadFromJSON(savedCanvas, (obj)=> {
                    fabricCanvas.renderAll()
                    fabricCanvas.requestRenderAll()
                }
            )
            
        }
    }
}

function resizeCanvas(fabricCanvas) {
    if(fabricCanvas){
        fabricCanvas.setDimensions({width: window.innerWidth - 15, height: fabricCanvas.height});
        fabricCanvas.calcOffset(); 
        fabricCanvas.requestRenderAll();
    }
}

export function Canvas(){
    const canvasRef = useRef(null)
    const fabricCanvasRef = useRef(null)
    const isExpanding = useRef(false)
    const canvasInfo = useCanvas()
    const {events} = useCanvasActions()
    const {canvas, resetPdf, hiddenCanvasRef} = canvasInfo
    useShortcut(events)

    useEffect(()=> {
        initCanvas(canvasRef, fabricCanvasRef, canvasInfo)
        const handleWindowResize = ()=>{ resizeCanvas(fabricCanvasRef.current) }
        window.addEventListener('resize', handleWindowResize ) 
        return () => {
            window.removeEventListener('resize', handleWindowResize )
            if(canvas) canvas.dispose()
            resetPdf()
        }   
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
        <div onScroll={handleScroll} className={`h-full w-full overflow-y-scroll
            transition-all duration-500 flex justify-end`}>
            <canvas className="" ref={canvasRef}/>
            <canvas ref={hiddenCanvasRef} className="hidden" />
        </div> 
        </>
    )
}