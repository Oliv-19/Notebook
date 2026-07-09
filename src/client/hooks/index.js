import { useCallback } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useCanvas } from "../Canvas/CanvasContext";

export function useShortcut(keyDownMap){
    const mapRef  = useRef(keyDownMap)
    useLayoutEffect(()=>{
        mapRef.current = keyDownMap
    })
    const handleKeyDown = useCallback(e => {
        e.preventDefault()
        const modifiers= {
            ctrl: e.ctrlKey,
            alt: e.altKey,
            cmd: e.metaKey,
            shift: e.shiftKey
        }
        Object.entries(mapRef.current).forEach(([shortcut, callback])=> {
            if(shortcut.includes('+')){
                const keysArray = shortcut.split('+')
                if(modifiers[keysArray[0]] && e.key == keysArray[1]){
                    return callback()
                }
            }
            
            if(shortcut == e.key || shortcut == e.code){
                return callback()
            }
        })
    },[]) 
    
    useEffect(()=> {
        document.addEventListener('keydown',handleKeyDown )
        return () => {
            document.removeEventListener('keydown',handleKeyDown ) 
        }
        
    },[])
}


