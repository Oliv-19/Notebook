import { useCanvas } from "./CanvasContext"

export function PdfViewer(){
    const {pdf} = useCanvas()
    return (
        <>
        {pdf && <iframe src={pdf} className="absolute top-0 w-150 h-full" 
            frameborder="0" />}
        </>
    )
}