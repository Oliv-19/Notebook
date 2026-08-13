import { useCanvasSettings } from '../Canvas/CanvasSettingsContext'

function DefaultColors(){
    const {setBrushColor} = useCanvasSettings()
    
    const colors = [
        '#000000', 
        '#ff0000', 
        '#ff00bb', 
        '#ae00ff', 
        '#001eff', 
        '#00d5ff', 
        '#00ff62', 
        '#ffea00',
        '#ff9500',
        '#ffffff',
    ]
    return (
        <>
            <div className="flex items-center h-full justify-center gap-1">

                {colors.map(color => 
                    <button onClick={()=>{setBrushColor(color)}} key={color} style={{'--color': color}} 
                    className={`bg-(--color) w-4 h-4 rounded cursor-pointer`} />
                )}
            </div>
        </>
    )
}

export function ColorChanger(){
    const {brushColor, setBrushColor} = useCanvasSettings()
    const changeColor = (e)=> {
        setBrushColor(e.target.value)   
    }
    return (
        <>
        <div className="flex items-center h-full justify-center gap-1">
            <DefaultColors />
            <input type="color" onChange={changeColor} value={brushColor} 
                className='w-8 h-8 cursor-pointer'
                />
        </div>
        </>
    )
}