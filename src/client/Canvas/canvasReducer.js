

export function canvasReducer(state, action){
    switch(action.type){
        case 'SET_CANVAS':
            return {...state, canvas: action.payload}
            break
        case 'SET_BRUSH_COLOR':
            return {...state, brushColor: action.payload}
            break
        case 'SET_BRUSH_SIZE':
            return {...state, brushSize: action.payload}
            break
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
                        redoStack: state.undoStack.slice(0, -1),
                    }
                }
            }
            break
        }
        case 'SAVE_HISTORY':{
            const {canvas, undoStack, redoStack} = state
            if(canvas == action.payload) return state
            return {
                ...state,
                redoStack: [],
                undoStack: [...state.undoStack, canvas]
            }
            break
        }
            
        default:
            return state
            break
    }
}