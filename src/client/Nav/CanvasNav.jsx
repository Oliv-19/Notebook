import { BrushResize } from "./BrushResize";
import { useCanvas } from "../Canvas/CanvasContext";
import { ColorChanger } from "./ColorChanger";
import { Button } from "./Buttons";
import { Link } from "react-router";
import { Setting } from "./Settings";
import { Options } from "./Options";


export function CanvasNav(){
    return (
        <>
        <nav className="bg-(--dark-green) p-3 flex justify-between w-full h-[8%]">
            <Link to={'/notebooks'} className="text-white font-medium text-2xl">
                Notebook
            </Link>
            <Button type={'draw'}/>
            <Button type={'select'}/>
            <Button type={'erase'}/>
            <Button type={'delete'}/>
            <Button type={'undo'}/>
            <Button type={'redo'}/>
            <Button type={'rect'}/>
            <Button type={'circle'}/>
            <Button type={'plane'}/>
            <ColorChanger />
            <BrushResize />
            <Options/>
            <Setting />
        </nav> 
        </>
    )
}