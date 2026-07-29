import { useState } from "react"
import { useCanvas } from "../Canvas/CanvasContext"
import { useEffect } from "react"

export function Setting(){
    const {canvas} = useCanvas()
    const [selectedObj, setSelectedObj] = useState(null)
    const [color, setColor] = useState(null)

    useEffect(()=> {
        if(canvas){
            canvas.on('selection:created', (e)=> {
                handleObjSelection(e.selected[0])
                
            })
            canvas.on('selection:cleared', (e)=> {
                setSelectedObj(null)
            })
        }
    }, [canvas])
    const handleObjSelection = (obj)=> {
        if(!obj) return 
        setSelectedObj(obj)
        setColor(obj.stroke)
    }
    const handleColorChange = (e)=> {
        const value = e.target.value
        setColor(value)
        if(selectedObj){
            selectedObj.set({stroke: value})
            canvas.renderAll()
        }
    }
    return (
        <>
        <div className="bg-(--green) absolute top-20 right-10 z-4">
            {selectedObj &&
                <div className="">
                    <p>Color: <span>{color}</span></p>
                    <input type="color" name="selectedColor" value={color} onChange={handleColorChange}/>
                </div>
            }
        </div>
        </>
    )
}