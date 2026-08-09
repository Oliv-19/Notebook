import { useCanvasSettings } from "../Canvas/CanvasSettingsContext"

function ThemeOption({theme}){
    const {backgroundPattern, setBackgroundPattern} = useCanvasSettings()
    const changeTheme = () => {
        setBackgroundPattern(backgroundPattern, theme) 
    }
    return (
        <>
            <button onClick={changeTheme} style={{'--bg': theme.bg, '--lines': theme.lines}}
                className={`w-10 h-10 bg-(--bg) rounded cursor-pointer`}>
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
    const theme = [
        {bg:'#ffffff', lines:'#c5c9d1'},
        {bg:'#121212', lines:'#2E2E2E'},
        {bg:'#F5EBE0', lines:'#D5BDAF'},
    ]
    return (
        <>
            <div className="flex flex-wrap gap-2 w-full h-fit justify-center">
                {theme.map((t) => <ThemeOption key={t.bg+t.lines} theme={t} />)}
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