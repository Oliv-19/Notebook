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
            <Button type={'select'}/>
            <Button type={'delete'}/>
            <Button type={'draw'}/>
            <Button type={'undo'}/>
            <Button type={'redo'}/>
            <ColorChanger />
            <BrushResize />
            <button onClick={()=> {setIsOpen(true)}}>Options</button>
            <div onClick={()=> {setIsOpen(false)}} className={`bg-transparent
                h-full w-full absolute top-0 right-0 z-2 
                ${isOpen? 'block': 'hidden'}`}
            />
            <div className={`${isOpen ? 'flex': 'hidden'} absolute`}>
                <div className=" absolute  
                    w-fit  bg-(--green)/90 top-10 -right-320 z-3"
                    >
                    <div className="relative flex flex-col gap-2 p-2">

                    <SaveButton/>
                    <ImportPDF/>
                    {user && <button onClick={logoutUser}>logout</button>}
                    </div>

                </div>
            </div>
        </nav> 
        </>
    )
}