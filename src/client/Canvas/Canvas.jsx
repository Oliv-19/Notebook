import { useEffect, useRef} from "react"
import { useCanvas } from "./CanvasContext"
import * as fabric from 'fabric'
import { useShortcut } from "../hooks/index"
import { getCanvas } from "../services/canvas"
import { getCurrNotebook } from "../services/notebooks"

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
    const fabricCanvasRef = useRef(null)
    const isExpanding = useRef(false)
    const {
        undo, 
        redo,
        canvas, 
        setCanvas,
        saveHistory,
        selectMode,
        deleteSelection,
        uploadPdf,
        resetPdf,
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
            configureCanvas(fabricCanvas, saveHistory)
            setCanvas(fabricCanvas) 
            const notebook =  getCurrNotebook()
            if(notebook){
                const {savedCanvas, pdf} = await getCanvas(notebook.id)
                if(pdf){
                    uploadPdf(pdf)

                } 
                if(savedCanvas){ 
                    fabricCanvas.loadFromJSON(savedCanvas, (obj)=> {
                        fabricCanvas.renderAll()
                        fabricCanvas.requestRenderAll()
                    },)
                }
            }
        }
        initCanvas()
        function handleWindowResize() {
            if(fabricCanvasRef.current){
                fabricCanvasRef.current.setDimensions({width: window.innerWidth - 15, height: fabricCanvasRef.current.height});
                fabricCanvasRef.current.calcOffset(); 
                fabricCanvasRef.current.requestRenderAll();
            }
        }
        window.addEventListener('resize', handleWindowResize) 
        return () => {
            window.removeEventListener('resize', handleWindowResize)
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
        <div onScroll={handleScroll} className={`h-138 w-full overflow-y-scroll 
            transition-all duration-500 flex justify-end`}>
            <canvas className="" ref={canvasRef}/>
        </div> 
        </>
    )
}