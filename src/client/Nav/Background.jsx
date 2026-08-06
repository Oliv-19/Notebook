import { useCanvasSettings } from "../Canvas/CanvasSettingsContext"

export function Background(){
    const { setBackgroundPattern }= useCanvasSettings()

    const changeBackgroundStyle = (e) => {
        const pattern = setBackgroundPattern(e.target.value)
        
    }
    
    return (
        <>
            <div className="">
                <label onChange={changeBackgroundStyle}>
                    Grid
                    <input type="radio" name="grid" id="grid" value={'grid'}/>
                </label>
                <label onChange={changeBackgroundStyle}>
                    Line
                    <input type="radio" name="line" id="line" value={'line'}/>
                </label>
            </div>
        </>
    )
    
}