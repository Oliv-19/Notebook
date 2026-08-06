import { useState } from "react";
import { useCanvas } from "../Canvas/CanvasContext"
import { getPdf } from "../services/pdfs"

export function Accordion({ buttonTitle, children}){
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
        <button 
            onClick={()=>{setIsOpen(prev =>!prev)}}
            className="w-full h-fit flex items-center justify-around cursor-pointer">
            <p>{buttonTitle}</p>
            <div className={`fill-black w-5 ${isOpen && 'rotate-180'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>chevron-down</title>
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
            </div>
        </button>
        {isOpen && (
            <>
                <div className={`w-full h-fit trans py-2 transition-transform duration-1000 ease-in-out `}>
                    {children}
                </div>
            </>
        )}
        </>
    )
}

