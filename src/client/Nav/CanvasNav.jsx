import { BrushResize } from "./BrushResize";
import { useCanvas } from "../Canvas/CanvasContext";
import { ColorChanger } from "./ColorChanger";
import { Button } from "./Buttons";
import { ImportPDF } from "./ImportPDF";
import { SaveButton } from "./SaveButton";
import { useAuth } from "../AuthContext";
import { Link } from "react-router";
import { useState } from "react";
import { Setting } from "./Settings";

function Dropdown(){
    const {user, logoutUser} = useAuth()
    const [openDropdown, setOpenDropdown] = useState(false)
    return (
        <>
            <div className="">
                <div onClick={()=>{setOpenDropdown(false)}} 
                    className={`${openDropdown? 'block': 'hidden'} z-2 fixed inset-0 bg-black/10 
                    transition-opacity` }/>
                <button 
                    onClick={()=>{setOpenDropdown(prev =>!prev)}}
                    className="w-30 h-10 text-(--color-text) flex flex-row items-center 
                    justify-evenly cursor-pointer font-medium">
                    <p>Options</p>
                </button>
                <div className="relative">
                    <div className={`text-(--color-text) py-2 bg-(--green) h-fit max-h-100 absolute z-3 
                        flex-col w-fit min-w-40 max-w-50 rounded ${openDropdown? 'flex' : 'hidden'}
                        overflow-y-auto overflow-x-hidden right-0
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400`}>
                        <SaveButton/>
                        <ImportPDF/>
                        {user && <button onClick={logoutUser}>logout</button>}
                    </div>
                </div>
                
            </div>
        </>
    )
}


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
            <Dropdown/>
            <Setting />
        </nav> 
        </>
    )
}