import { useCanvasSettings } from '../Canvas/CanvasSettingsContext'

export function ColorChanger(){
    const {brushColor, setBrushColor} = useCanvasSettings()
    const changeColor = (e)=> {
        setBrushColor(e.target.value)   
    }
    return (
        <>
            <input type="color" onChange={changeColor} defaultValue={brushColor}/>
        </>
    )
}