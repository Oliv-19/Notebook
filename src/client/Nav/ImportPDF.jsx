import { useCanvas } from "../Canvas/CanvasContext";
import * as fabric from 'fabric'

export function ImportPDF(){
    const {uploadPdf} = useCanvas()
    const  upload = async(e)=> {
        e.preventDefault()
        const file = e.target.files[0]
        if(file && file.type == 'application/pdf') {
            const url = URL.createObjectURL(file)
            uploadPdf(url)

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