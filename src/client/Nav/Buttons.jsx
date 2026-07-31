import { useState } from "react"
import { useCanvas } from "../Canvas/CanvasContext"

export function Button({type}){
    const {events} = useCanvas()
    const handleClick = ()=>{
        events[type].callback()
    }
    
    return (
        <>
        <button 
            onClick={handleClick}>
            {type}
        </button>
        </>
    )
} 