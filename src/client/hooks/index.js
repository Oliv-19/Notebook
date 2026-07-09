import { useCallback } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";

export function useShortcut(shortcut, callback, callbackKeyUp= null){
    const callbackRef  = useRef(callback)
    const callbackKeyUpRef  = useRef(callbackKeyUp)
    useLayoutEffect(()=>{
        callbackRef.current = callback
        callbackKeyUpRef.current = callbackKeyUp
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
       if(shortcut == e.key || (shortcut == 'space' && e.code== 'Space')){
        return callbackRef.current()
       }
        
    },[]) 
    const handleKeyUp = useCallback(e => {
        if(shortcut == e.key || (shortcut == 'space' && e.code== 'Space')){
            return callbackKeyUpRef.current()
        }
        
    },[])

    useEffect(()=> {
       document.addEventListener('keydown',handleKeyDown )
       if(callbackKeyUp){
           document.addEventListener('keyup',handleKeyUp )
       }
       return () => {
            document.removeEventListener('keydown',handleKeyDown ) 
            if(callbackKeyUp){
                document.removeEventListener('keyup', handleKeyUp ) 
            }
       }
        
    },[handleKeyDown])
}