import { useCanvasSettings } from "../Canvas/CanvasSettingsContext"

export function BrushResize(){
    const {brushSize, setBrushSize} = useCanvasSettings()
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