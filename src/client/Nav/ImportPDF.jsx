import { useState } from "react";
import { useCanvas } from "../Canvas/CanvasContext"
import { getPdf } from "../services/pdfs"
import { Accordion } from "./Accordion";

export function ImportPDF({isOpen, close}){
    const [openImportPDF, setopenImportPDF] = useState(false)
    const {uploadPdf} = useCanvas()
    const submitPdf = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const file = formData.get('pdf')
        const fileWeb = formData.get('pdfWeb')
        if(file && file.type == 'application/pdf'){
            uploadPdf(file)
        }else if(fileWeb){
            uploadPdf(fileWeb) 
        }
        close()
    }
    return (
        <>
        <Accordion buttonTitle={'Import Pdf'}>
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
        </Accordion>
        </>
    )
}

