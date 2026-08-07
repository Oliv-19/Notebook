import { useReducer } from "react"
import { createContext } from "react"
import { actionsReducer } from "./canvasReducer"
import { useContext } from "react"
import { useCanvas } from "./CanvasContext"

const ActionsContext = createContext()

const actionsInitState= {
    isSelection: false,
    undoStack: [],
    redoStack: [],
}
export function CanvasActionsProvider({children}){
    const {canvas, hiddenCanvasRef} = useCanvas()
    const [actionsState, dispatchAction] = useReducer(actionsReducer, actionsInitState)
    const { isSelection } = actionsState

    const setAction = (type, payload)=> {
        dispatchAction({type, payload})
    }
    const events= {
        undo: {shortcut: 'ctrl+z', callback: ()=>{setAction('UNDO', {canvas})} },
        redo: {shortcut: 'ctrl+y', callback: ()=>{setAction('REDO', {canvas})} },
        select: {shortcut: 'v', callback: ()=>{setAction('SELECT_MODE', {isSelect: true, canvas})} },
        draw: {shortcut: 'b', callback: ()=>{setAction('SELECT_MODE', {isSelect: false, canvas})} },
        delete: {shortcut: 'Delete', callback: ()=>{setAction('DELETE', {canvas})} },
        paste: {shortcut: 'Paste', callback: (clipboardData)=>{
            const items = clipboardData.items
            if (!items) return
            for(const item of items){
                
                if(item.type.indexOf('image') !== -1){
                    const file = item.getAsFile()
                    if(file){
                        actionsInfo.uploadImg(file)
                    } 
                }
                
            }
        } },
        rect: {shortcut: ' ', callback: ()=>{setAction('ADD_RECT', {canvas})} },
        circle: {shortcut: ' ', callback: ()=>{setAction('ADD_CIRCLE', {canvas})} },
        plane: {shortcut: ' ', callback: ()=>{setAction('ADD_CARTESIAN_PLANE', {canvas, hiddenCanvas: hiddenCanvasRef.current})} },
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