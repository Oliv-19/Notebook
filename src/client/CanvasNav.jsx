import { BrushResize } from "./BrushResize";
import { ColorChanger } from "./ColorChanger";


export function CanvasNav(){
    return (
        <>
        <nav className="bg-(--green) p-3 flex justify-between">
            <h1 className="text-white font-medium text-2xl">Notebook</h1>
            <div className="w-100">
                <ColorChanger />
                <BrushResize />
            </div>
        </nav> 
        </>
    )
}