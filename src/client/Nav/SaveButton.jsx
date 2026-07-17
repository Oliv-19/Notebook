import { useCanvas } from "../Canvas/CanvasContext"
import { saveCanvas } from "../services/canvas"

export function SaveButton(){
    const {canvas} = useCanvas()
    const save = async()=> {
        await saveCanvas(canvas)
    }
    return (
        <>
        <button onClick={save}>Save</button>
        </>
    )
}