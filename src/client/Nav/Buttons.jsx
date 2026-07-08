import { useState } from "react"
import { useCanvas } from "../CanvasContext"

export function Button({type}){
    const {undo, redo, canvas} = useCanvas()
    return (
        <>
        <button 
            onClick={()=> {type == 'undo' ? undo(canvas) : redo(canvas)}}>
            {type}
        </button>
        </>
    )
}