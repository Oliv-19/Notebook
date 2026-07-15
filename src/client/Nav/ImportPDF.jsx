import { useState } from "react";
import { useCanvas } from "../Canvas/CanvasContext"
import { getPdf } from "../services/pdfs"

function Dialog({isOpen, close}){
    const {uploadPdf} = useCanvas()
    const submitPdf = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const file = formData.get('pdf')
        const fileWeb = formData.get('pdfWeb')
        if(file && file.type == 'application/pdf'){
            uploadPdf(file)
            close()
        }else if(fileWeb){
            const blob =await getPdf(fileWeb)
            console.log(blob);
            
            uploadPdf(blob)
            close()
            
        }
    }
    return(
        <>
        <div className={`${isOpen? 'flex' : 'hidden'} absolute top-0 left-0 w-full 
            h-full justify-center items-center z-2`}>
                <div className="bg-purple-100 w-150 h-50 ">
                <form className="w-full h-full" onSubmit={submitPdf} action="">
                    <input type="text" name="pdfWeb" id="pdfWeb"/>
                    
                    <label className="flex flex-col">
                        Import PDF from your computer
                        <input type="file" name="pdf" className="hidden"/>
                    </label>
                    <button type="submit" className="border">
                        Import
                    </button>
                </form>
                </div>
        </div>
        </>
    )
}

export function ImportPDF(){
    const [isOpen, setIsOpen]= useState(false)
    return (
        <>
        <button onClick={()=> {setIsOpen(true)}}>Import PDF</button>
        <Dialog isOpen={isOpen} close={() => {setIsOpen(false)}}/>
        </>
    )
}