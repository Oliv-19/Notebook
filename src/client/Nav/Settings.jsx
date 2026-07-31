import { useState } from "react"
import { useCanvas } from "../Canvas/CanvasContext"
import { useEffect } from "react"

export function Setting(){
    const {canvas} = useCanvas()
    const [selectedObjs, setSelectedObjs] = useState(null)
    const [color, setColor] = useState('#000000')

    useEffect(()=> {
        if(canvas){
            canvas.on('selection:created', (e)=> {
                handleObjSelection(e.selected)
            })
            canvas.on('selection:cleared', (e)=> {
                reset()
            })
        }
    }, [canvas])
    const reset = () => {
        if(selectedObjs) {
            setSelectedObjs(null)
        } 
    }
    const handleObjSelection = (objs)=> {
        if(!objs) return 
        
        setSelectedObjs(objs)
        setColor(objs[0].stroke)
    }
    const handleColorChange = (e)=> {
        const value = e.target.value
        setColor(value)
        if(selectedObjs){
            selectedObjs.forEach(obj => {
                obj.set({stroke: value})
                
            })
            canvas.renderAll()
        }
    }
    return (
        <>
        <div className="bg-(--green) absolute top-20 right-10 z-4">
            {selectedObjs &&
                <div className="">
                    <p>Color: <span>{color}</span></p>
                    <input type="color" name="selectedColor" value={color} onChange={handleColorChange}/>
                </div>
            }
        </div>
        </>
    )
}