import { useCanvas } from "../Canvas/CanvasContext";
import * as fabric from 'fabric'
import { uploadPdf } from "../services/pdfs";

export function ImportPDF(){
    const {convertPdf} = useCanvas()
    const  upload = async(e)=> {
        e.preventDefault()
        const file = e.target.files[0]
        if(file) {
            const formData = new FormData()
            formData.append('pdf', file)
            const data = await uploadPdf(formData)
            convertPdf(data)

        } 
    }
    return (
        <>
        <label className="">
            Import PDF
            <input type="file" name="pdf" className="hidden" onChange={upload}/>
        </label>
        </>
    )
}