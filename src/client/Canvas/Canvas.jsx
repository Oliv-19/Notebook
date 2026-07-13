import { useState, useEffect, useRef} from "react"
import { useCanvas } from "./CanvasContext"
import * as fabric from 'fabric'
import { useShortcut } from "../hooks/index"

export function Canvas(){
    const canvasRef = useRef(null)
    const {
        brushColor, 
        brushSize, 
        canvasSize, 
        undo, 
        redo,
        canvas, 
        setCanvas,
        saveHistory,
        selectMode,
        deleteSelection,
        loadBgImg,
        pdfPages
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
        fabricCanvas.freeDrawingBrush.color = brushColor
        fabricCanvas.freeDrawingBrush.width = parseInt(brushSize, 10)
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
    
    const loadPdfBg = async ()=>{
        let currentTop = 450
        for (const page of pdfPages){
            const img = await fabric.FabricImage.fromURL(page)
            img.set({
                left: 320,
                top: currentTop,
                selectable: false,
                evented:false,
                hasControls: false,
                hasBorders: false,
                lockMovementX: true,
                lockMovementY: true,
                scaleX: 0.5,
                scaleY: 0.5,
            })
            currentTop = currentTop + img.height * img.scaleY
            canvas.setDimensions({
                height: currentTop
            })
            canvas.add(img)
        }            
        canvas.renderAll()
    }
    useEffect(()=> {
        if(canvas){
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
        canvas.freeDrawingBrush.color = brushColor
        canvas.freeDrawingBrush.width = parseInt(brushSize, 10) 
        loadPdfBg()
        }
    },[brushColor, brushSize, pdfPages])

    return (
        <>
        <div className="">
            <canvas ref={canvasRef}/>
        </div> 
        </>
    )
}