import { useCanvas } from "./CanvasContext"

function ColorChanger(){
    const {brushColor, setBrushColor} = useCanvas()
    const changeColor = (e)=> {
        setBrushColor(e.target.value)   
    }
    return (
        <>
            <input type="color" onChange={changeColor} defaultValue={brushColor}/>
        </>
    )
}

export function CanvasNav(){
    return (
        <>
        <nav className="bg-(--green) p-3 flex justify-between">
            <h1 className="text-white font-medium text-2xl">Notebook</h1>
            <div className="w-100">
                <ColorChanger />

            </div>
        </nav> 
        </>
    )
}