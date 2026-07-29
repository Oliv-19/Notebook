import { useEffect } from "react"
import { useCanvas } from "./CanvasContext"

export function PdfViewer(){
    const {pdf} = useCanvas()
    return (
        <>
        {pdf && <iframe src={pdf} className=" top-0 w-150 h-screen" 
            frameBorder="0" />}
        </>
    )
}