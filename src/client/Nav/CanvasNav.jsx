import { BrushResize } from "./BrushResize";
import { useCanvas } from "../Canvas/CanvasContext";
import { ColorChanger } from "./ColorChanger";
import { Button } from "./Buttons";


export function CanvasNav(){
    return (
        <>
        <nav className="bg-(--green) p-3 flex justify-between">
            <h1 className="text-white font-medium text-2xl">Notebook</h1>
            <div className="w-100">
                <Button type={'undo'}/>
                <Button type={'redo'}/>
                <ColorChanger />
                <BrushResize />
            </div>
        </nav> 
        </>
    )
}