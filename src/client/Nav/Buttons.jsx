import { useState } from "react"
import { useCanvas } from "../Canvas/CanvasContext"

export function Button({type}){
    const {undo, redo, selectMode} = useCanvas()
    const events = {
        undo: () => {undo()},
        redo: ()=>  {redo()},
        select: ()=> {selectMode(true)},
        draw: ()=> {selectMode(false)}
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