import { uploadPdf } from "../services/pdfs"
import * as fabric from 'fabric'

export function canvasSettingsReducer(state, action){
    switch(action.type){
        case 'SET_BRUSH_COLOR':
            return {...state, brushColor: action.payload}
            break
        case 'SET_BRUSH_SIZE':
            return {...state, brushSize: action.payload}
            break  
        default:
            return state
            break
        }
        }
        
export function canvasInstanceReducer(state, action){
    switch(action.type){
        case 'SET_CANVAS':
            return {...state, canvas: action.payload}
            break
        case 'SET_DIMENSIONS':
            const {width, height} = action.payload
            return {...state, dimensions:{w: width, h: height}}
            case 'UNDO': {
            const {canvas} = state
            if(canvas){
                const objects = canvas.getObjects()
                if(objects.length > 0){
                    const lastObj = objects[objects.length-1]
                    canvas.remove(lastObj)
                    canvas.renderAll()
                    return {
                        ...state,
                        undoStack: state.undoStack.slice(0, -1),
                        redoStack: [...state.redoStack, lastObj]
                    }
                }
            }
            break

        }
        case 'REDO':{
            const {canvas, redoStack} = state
            if(canvas){
                if(redoStack.length > 0){
                    const objToRestore = redoStack[redoStack.length-1]
                    canvas.add(objToRestore)
                    canvas.renderAll()
                    return {
                        ...state,
                        redoStack: redoStack.slice(0, -1),
                    }
                }
            }
            break
        }
        case 'SAVE_HISTORY':{
            const {canvas, undoStack} = state
            if(canvas == action.payload) return state
            return {
                ...state,
                redoStack: [],
                undoStack: [...state.undoStack, canvas]
            }
            break
        }
        case 'SELECT_MODE': {
            const {canvas} = state
            if(canvas){
                canvas.isDrawingMode = !action.payload
                canvas.selection = action.payload
                return {
                    ...state,
                    isSelection : action.payload
                }
            }
            break
        }
        case 'DELETE':{
            const {canvas} = state
            if(canvas){
                const activeObjects = canvas.getActiveObjects()
                if(activeObjects.length > 0){
                    canvas.discardActiveObject()
                    activeObjects.forEach(obj => {
                        canvas.remove(obj)
                    })
                    canvas.renderAll()
                }
            }
        }   
        default:
            return state
            break
    }
}

export function pdfReducer(state, action) {
    switch(action.type){
        case 'UPLOAD_PDF':{
            const data = action.payload
            try {
                if(data){
                    return {...state, pages: data}
                }
                return {...state, pages: []}
            } catch (error){
                console.error(error)
            }
        }
        default:
            return state
            break
    }
}