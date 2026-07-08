import { BrushResize } from "./BrushResize";
import { useCanvas } from "./CanvasContext";
import { ColorChanger } from "./ColorChanger";


export function CanvasNav(){
    const {undo, canvas} = useCanvas()
    return (
        <>
        <nav className="bg-(--green) p-3 flex justify-between">
            <h1 className="text-white font-medium text-2xl">Notebook</h1>
            <div className="w-100">
                <button onClick={()=> {undo(canvas)}}>Undo</button>
                <ColorChanger />
                <BrushResize />
            </div>
        </nav> 
        </>
    )
}