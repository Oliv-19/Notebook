import { useState } from "react";
import { useCanvas } from "../Canvas/CanvasContext"
import { getPdf } from "../services/pdfs"
import { useRef } from "react";
import { Accordion } from "./Accordion";

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
        <Accordion buttonTitle={'Import Img'}>
            <form className="w-full h-full" onSubmit={submitImg} action="">
                <input type="text" name='imgWeb' id="imgWeb"/>
                
                <label className="flex flex-col">
                    Import Image from your computer
                    <input type="file" name="img" className="hidden"/>
                </label>
                <button type="submit" className="border">
                    Import
                </button>
            </form>
        </Accordion>
        </>
    )
}
