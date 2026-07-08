import { useCanvas } from "../Canvas/CanvasContext"

export function ColorChanger(){
    const {brushColor, setBrushColor} = useCanvas()
    const changeColor = (e)=> {
        setBrushColor(e.target.value)   
    }
    return (
        <>
            <input type="color" onChange={changeColor} defaultValue={brushColor}/>
        </>
    )
}