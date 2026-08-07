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
                    <input type="radio" name="style" id="grid" value={'grid'} />
                </label>
                <label onChange={changeBackgroundStyle}>
                    Line
                    <input type="radio" name="style" id="line" value={'line'}/>
                </label>
                <label onChange={changeBackgroundStyle}>
                    None
                    <input type="radio" name="style" id="none" value={'none'}/>
                </label>
            </div>
        </>
    )
    
}