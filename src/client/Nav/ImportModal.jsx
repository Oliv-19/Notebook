import { useState } from "react";
import { useCanvas } from "../Canvas/CanvasContext"
import { getPdf } from "../services/pdfs"

export function ImportModal({isOpen, onSubmit, children}){
    return (
        <>
        {isOpen && 
            <>  
            <div className="w-full h-full m-auto flex justify-center items-center">
                    <div className="bg-purple-100 w-150 h-50 z-3">
                    <form className="w-full h-full" onSubmit={onSubmit} action="">
                        {children}
                    </form>
                </div>
            </div>
            </>
        }
        </>
    )
}

