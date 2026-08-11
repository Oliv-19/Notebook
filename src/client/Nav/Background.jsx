import { useState } from "react"
import { useCanvasSettings } from "../Canvas/CanvasSettingsContext"

function ThemeOption({theme, brushColor}){
    const {backgroundPattern, backgroundTheme, setBackgroundPattern, setBrushColor} = useCanvasSettings()
    const changeTheme = () => {
        setBackgroundPattern(backgroundPattern, theme) 
        setBrushColor(brushColor)
    }
    return (
        <>
            <button onClick={changeTheme} style={{'--bg': theme.bg, '--lines': theme.lines}}
                className={`w-10 h-10 bg-(--bg) rounded cursor-pointer 
                    ${backgroundTheme.bg == theme.bg ? 'outline-2 outline-(--dark-green)' : 'outline-none'}`}>
                { backgroundPattern == 'line' ?
                    <hr className={`text-(--lines)`}/> 
                    : (backgroundPattern == 'grid' && 
                        <>
                            <hr className={`text-(--lines)`}/>
                            <hr className={`text-(--lines) rotate-90`}/> 
                        </>
                    )
                    
                }
            </button>
        </>
    )
}

function Themes(){
    const themes = [
        [{bg:'#ffffff', lines:'#c5c9d1'}, '#000000'],
        [{bg:'#353535', lines:'#676767'}, '#e8e8e8'],
        [{bg:'#f5f2ee', lines:'#D5BDAF'}, '#000000'],
    ]
    return (
        <>
            <div className="flex flex-wrap gap-2 w-full h-fit justify-center">
                {themes.map(([theme, brush]) => 
                    <ThemeOption key={theme.bg+theme.lines} theme={theme} brushColor={brush}/>
                )}
            </div>
            
        </>
    )
}

export function Background(){
    const { setBackgroundPattern, backgroundPattern, backgroundTheme}= useCanvasSettings()

    const changeBackgroundStyle = (e) => {
        const pattern = setBackgroundPattern(e.target.value, backgroundTheme) 
    }
    
    return (
        <>
            <div className="">
                <label >
                    Grid
                    <input onChange={changeBackgroundStyle} checked={backgroundPattern == 'grid'} type="radio" name="style" id="grid" value={'grid'} />
                </label>
                <label >
                    Line
                    <input onChange={changeBackgroundStyle} checked={backgroundPattern == 'line'} type="radio" name="style" id="line" value={'line'}/>
                </label>
                <label >
                    None
                    <input onChange={changeBackgroundStyle} checked={backgroundPattern == 'none'} type="radio" name="style" id="none" value={'none'}/>
                </label>
            </div>
            <Themes />
        </>
    )
    
}