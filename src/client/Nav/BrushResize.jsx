import { useCanvas } from "../Canvas/CanvasContext"

export function BrushResize(){
    const {brushSize, setBrushSize} = useCanvas()
    const changeBrushSize = (e) => {
        setBrushSize(e.target.value)
    }
    return (
        <>
            <input type="range" min={'1'} max={'20'} value={brushSize} 
                onChange={changeBrushSize}/>
        </>
    )
}