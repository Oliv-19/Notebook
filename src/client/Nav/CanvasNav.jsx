import { BrushResize } from "./BrushResize";
import { useCanvas } from "../Canvas/CanvasContext";
import { ColorChanger } from "./ColorChanger";
import { Button } from "./Buttons";
import { ImportPDF } from "./ImportPDF";


export function CanvasNav(){
    return (
        <>
        <nav className="bg-(--green) p-3 flex justify-between">
            <h1 className="text-white font-medium text-2xl">Notebook</h1>
            <div className="w-100 flex gap-2">
                <ImportPDF/>
                <Button type={'select'}/>
                <Button type={'delete'}/>
                <Button type={'draw'}/>
                <Button type={'undo'}/>
                <Button type={'redo'}/>
                <ColorChanger />
                <BrushResize />
            </div>
        </nav> 
        </>
    )
}