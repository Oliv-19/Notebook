import { useCallback } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";

export function useShortcut(shortcut, callback){
    const callbackRef  = useRef(callback)
    useLayoutEffect(()=>{
        callbackRef.current = callback
    })

    const handleKeyDown = useCallback(e => {
        const modifiers= {
            ctrl: e.ctrlKey,
            alt: e.altKey,
            cmd: e.metaKey,
            shift: e.shiftKey
        }
       if(shortcut.includes('+')){
        const keyArray = shortcut.split('+')
        if(Object.keys(modifiers).includes(keyArray[0])){
            const finalKey = keyArray.pop()
            if(keyArray.every(k=> modifiers[k]) && finalKey === e.key){
                return callbackRef.current()
            }
        }
       }
       if(shortcut == e.key){
        return callbackRef.current()
       }
        
    },[]) 

    useEffect(()=> {
       document.addEventListener('keydown',handleKeyDown )
       return () => document.removeEventListener('keydown',handleKeyDown ) 
        
    },[handleKeyDown])
}