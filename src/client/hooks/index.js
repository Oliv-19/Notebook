import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useCanvas } from "../Canvas/CanvasContext";

export function useShortcut(keyDownMap){
    const mapRef  = useRef(keyDownMap)
    useLayoutEffect(()=>{
        mapRef.current = keyDownMap
    })
    const handleKeyDown = useCallback(e => {
        const target = e.target.tagName.toLowerCase()
        if (target === 'input' || target === 'textarea') return
        if ((e.ctrlKey || e.metaKey) && ['v', 'c', 'x'].includes(e.key.toLowerCase())) {
            return
        }
        const modifiers= {
            ctrl: e.ctrlKey,
            alt: e.altKey,
            cmd: e.metaKey,
            shift: e.shiftKey
        }
        const events = {
            undo: mapRef.current.undo,
            redo: mapRef.current.redo,
            select: mapRef.current.select,
            erase: mapRef.current.erase,
            draw: mapRef.current.draw,
            delete: mapRef.current.delete,
        }
         Object.entries(events).forEach(([key, {shortcut, callback}])=> {
            if(shortcut.includes('+')){
                const keysArray = shortcut.split('+')
                if(modifiers[keysArray[0]] && e.key == keysArray[1]){
                    e.preventDefault()
                    return callback(e)
                }
            }else if(shortcut == e.key || shortcut == e.code){
                e.preventDefault()
                return callback()
            }
        })
    },[]) 

    const handlePaste = (e) => {
        const clipboardData = event.clipboardData || window.clipboardData;
        if(clipboardData && clipboardData.items){
            return mapRef.current.paste.callback(clipboardData)
        }
    }
    
    useEffect(()=> {
        document.addEventListener('paste',handlePaste )
        document.addEventListener('keydown',handleKeyDown )
        return () => {
            document.removeEventListener('paste',handlePaste ) 
            document.removeEventListener('keydown',handleKeyDown ) 
        }
        
    },[handleKeyDown, handlePaste])
}


