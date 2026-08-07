import { useState } from "react"
import { useCanvasActions } from "../Canvas/CanvasActionsContext"

export function Button({type}){
    const {events} = useCanvasActions()
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