import { useReducer } from "react"
import { createContext } from "react"
import { actionsReducer } from "./canvasReducer"
import { useContext } from "react"
import { useCanvas } from "./CanvasContext"
import { useCanvasSettings } from "./CanvasSettingsContext"

const ActionsContext = createContext()

const actionsInitState= {
    isSelection: false,
    undoStack: [],
    redoStack: [],
}
export function CanvasActionsProvider({children}){
    const {canvas, hiddenCanvasRef, undo, redo} = useCanvas()
    const {brushColor, brushSize} = useCanvasSettings()
    const [actionsState, dispatchAction] = useReducer(actionsReducer, actionsInitState)
    const { isSelection } = actionsState

    const setAction = (type, payload)=> {
        dispatchAction({type, payload})
    }
    const events= {
        undo: {shortcut: 'ctrl+z', callback: ()=>{undo()} },
        redo: {shortcut: 'ctrl+y', callback: ()=>{redo()} },
        select: {shortcut: 'v', callback: ()=>{setAction('SELECT_MODE', {isSelect: true, canvas})} },
        draw: {shortcut: 'b', callback: ()=>{setAction('DRAWING_MODE', {canvas, brushColor, brushSize})} },
        erase: {shortcut: 'e', callback: ()=>{setAction('ERASER_MODE', {canvas})} },
        delete: {shortcut: 'Delete', callback: ()=>{setAction('DELETE', {canvas})} },
        paste: {shortcut: 'Paste', callback: (clipboardData)=>{
            const items = clipboardData.items
            if (!items) return
            for(const item of items){
                
                if(item.type.indexOf('image') !== -1){
                    const file = item.getAsFile()
                    if(file){
                        actionsInfo.uploadImg(file)
                        return
                    } 
                }
                
            }
        } },
        rect: {shortcut: undefined, callback: ()=>{setAction('ADD_RECT', {canvas, brushColor})} },
        circle: {shortcut: undefined, callback: ()=>{setAction('ADD_CIRCLE', {canvas, brushColor})} },
        plane: {shortcut: undefined, callback: ()=>{setAction('ADD_CARTESIAN_PLANE', {canvas, hiddenCanvas: hiddenCanvasRef.current})} },
    }
    const actionsInfo = {
        isSelectionMode: isSelection,
        uploadImg: (data)=> {setAction('UPLOAD_IMG', {data, hiddenCanvas: hiddenCanvasRef.current, canvas})},
        events
    }
    return (
        <ActionsContext value={actionsInfo}>
            {children}
        </ActionsContext>
    )
}

export const useCanvasActions = ()=> useContext(ActionsContext)