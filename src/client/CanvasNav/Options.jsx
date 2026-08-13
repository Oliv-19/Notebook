import { useState } from "react"
import { SaveButton } from "./SaveButton"
import { ImportPDF } from "./ImportPDF"
import { LogoutButton } from "./LogoutButton"
import { ImportIMG } from "./ImportIMG"
import { Background } from "./Background"
import { Dropdown } from "../Dropdown"

export function Options(){
    const [openDropdown, setOpenDropdown] = useState(false)
    return (
        <>
            <div className="">
                <button 
                    onClick={()=>{setOpenDropdown(prev =>!prev)}}
                    className="w-30 h-10 text-(--color-text) flex flex-row items-center 
                    justify-evenly cursor-pointer font-medium">
                    <p>Options</p>
                </button>
                <Dropdown isOpen={openDropdown} close={()=>{setOpenDropdown(false)}}>
                    <SaveButton/>
                    <ImportPDF close={close}/>
                    <ImportIMG close={close}/>
                    <Background/>
                    <LogoutButton/>
                </Dropdown>
            </div>
        </>
    )
}