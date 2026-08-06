import { useState } from "react"
import { useAuth } from "../AuthContext"
import { SaveButton } from "./SaveButton"
import { ImportPDF } from "./ImportPDF"
import { LogoutButton } from "./LogoutButton"
import { ImportIMG } from "./ImportIMG"
import { Background } from "./Background"

export function Options(){
    const [openDropdown, setOpenDropdown] = useState(false)
    const close = ()=> {
        setOpenDropdown(false)
    }
    return (
        <>
            <div className="">
                <div onClick={close} 
                    className={`${openDropdown? 'block': 'hidden'} z-2 fixed inset-0 bg-black/10 
                    transition-opacity` }/>
                <button 
                    onClick={()=>{setOpenDropdown(prev =>!prev)}}
                    className="w-30 h-10 text-(--color-text) flex flex-row items-center 
                    justify-evenly cursor-pointer font-medium">
                    <p>Options</p>
                </button>
                { openDropdown && 
                <div className="absolute w-full h-full top-0 right-0">
                    <div className={`text-(--color-text) py-2 bg-(--green) h-fit max-h-100 
                        absolute z-3 flex-col w-fit min-w-40 max-w-50 rounded flex top-15
                        overflow-y-auto overflow-x-hidden right-0
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400`}
                        >
                        <SaveButton/>
                        <ImportPDF close={close}/>
                        <ImportIMG close={close}/>
                        <Background/>
                        <LogoutButton/>
                    </div>
                </div>

                }
                
            </div>
        </>
    )
}