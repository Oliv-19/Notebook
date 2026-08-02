import { useState } from "react";
import { useCanvas } from "../Canvas/CanvasContext"
import { getPdf } from "../services/pdfs"
import { ImportModal } from "./ImportModal";

export function ImportIMG({isOpen, close}){
    const {uploadImg} = useCanvas()
    const submitImg = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const file = formData.get('img')
        const fileWeb = formData.get('imgWeb')
        
        if(file && file.type.includes('image')){
            uploadImg(file)
        }else if(fileWeb){
            uploadImg(fileWeb) 
        }
        close()
    }
    return (
        <>
        <ImportModal isOpen={isOpen} onSubmit={submitImg} fileName={'Image'}>
            <input type="text" name='imgWeb' id="imgWeb"/>
            
            <label className="flex flex-col">
                Import Image from your computer
                <input type="file" name="img" className="hidden"/>
            </label>
            <button type="submit" className="border">
                Import
            </button>
        </ImportModal>
        </>
    )
}
