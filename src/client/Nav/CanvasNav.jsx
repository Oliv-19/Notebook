import { BrushResize } from "./BrushResize";
import { useCanvas } from "../Canvas/CanvasContext";
import { ColorChanger } from "./ColorChanger";
import { Button } from "./Buttons";
import { ImportPDF } from "./ImportPDF";
import { SaveButton } from "./SaveButton";
import { useAuth } from "../AuthContext";
import { Link } from "react-router";
import { useState } from "react";


export function CanvasNav(){
    const {user, logoutUser} = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
        <nav className="bg-(--green) p-3 flex justify-between w-full">
            <Link to={'/notebooks'} className="text-white font-medium text-2xl">
                Notebook
            </Link>
            <button onClick={()=> {setIsOpen(true)}}>Options</button>
            {isOpen && (
                <>
                <div onClick={()=> {setIsOpen(false)}} className="bg-transparent
                    h-full w-full absolute top-0 right-0 z-2 "
                 />
                <div className="relative">
                    <div className="flex flex-col absolute  gap-2
                        w-fit p-2 bg-(--green)/90 top-10 right-0 z-3"
                        onClick={()=> {setIsOpen(false)}}>

                    <SaveButton/>
                    <ImportPDF/>
                    <Button type={'select'}/>
                    <Button type={'delete'}/>
                    <Button type={'draw'}/>
                    <Button type={'undo'}/>
                    <Button type={'redo'}/>
                    <ColorChanger />
                    <BrushResize />
                    {user && <button onClick={logoutUser}>logout</button>}
                    </div>
                    
                </div>
                </>
            )}
        </nav> 
        </>
    )
}