import { useState } from "react"
import { useCanvasActions } from "../Canvas/CanvasActionsContext"
import { Icon } from "../Icon"

export function Button({type}){
    const {events} = useCanvasActions()
    const handleClick = ()=>{
        events[type].callback()
    }
    
    return (
        <>
        <button className="cursor-pointer"
            onClick={handleClick}>
            <Icon iconName={type} style={'w-6 fill-white border-white'} />
        </button>
        </>
    )
} 