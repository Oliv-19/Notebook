import { useState } from "react"
import { useCanvas } from "../Canvas/CanvasContext"

export function Button({type}){
    const {undo, redo} = useCanvas()
    const events = {
        undo: () => {undo()},
        redo: ()=>  {redo()}
    }
    
    return (
        <>
        <button 
            onClick={events[type]}>
            {type}
        </button>
        </>
    )
}