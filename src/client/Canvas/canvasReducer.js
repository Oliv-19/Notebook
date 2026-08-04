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
            const {canvas} = state
            if(canvas){
                const originalWidth = canvas.getWidth()
                const scale = width / originalWidth
                canvas.setDimensions({width: width, height: height})
                canvas.setZoom(canvas.getZoom() * scale)
            }
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
        case 'UPLOAD_IMG':{
            const {data, hiddenCanvas} = action.payload
            const {canvas} = state
            if(canvas){
                const reader = new FileReader()
                reader.readAsDataURL(data)
                reader.onload = (url)=>{
                    const base64URL = url.target.result
                    
                    const img = new Image()
                    if(data.type.includes('image')){
                        img.src = base64URL
                        img.onload= () => {
                            const maxWidth = 800
                            let width = img.width 
                            let height = img.height 
                            if(width > maxWidth){
                                height = Math.round((height * maxWidth) / width)
                                width = maxWidth
                            }
                            hiddenCanvas.width = width
                            hiddenCanvas.height = height
                            const ctx = hiddenCanvas.getContext('2d')
                            ctx.drawImage(img, 0 , 0, width, height)
                            const base64 = hiddenCanvas.toDataURL('image/jpeg', 0.1)
                            
                            fabric.FabricImage.fromURL(base64)
                            .then(img => {
                                img.set({
                                    left: 320,
                                    top: 450,
                                    scaleX: 0.5,
                                    scaleY: 0.5
                                })
                                canvas.add(img)
                                canvas.renderAll()
                            }, {crossOrigin: 'anonymous'})        
                        }   
                    }else {
                        fabric.FabricImage.fromURL(base64URL)
                          .then(img => {
                            img.set({
                                left: 320,
                                top: 450,
                                scaleX: 0.5,
                                scaleY: 0.5
                            })
                            canvas.add(img)
                            canvas.renderAll()
                          }, {crossOrigin: 'anonymous'})              

                    }


                }
                return {...state}
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
            const url = URL.createObjectURL(data)
            return {...state, pdf: url}
        }
        case 'RESET_PDF':{
            return {...state, pdf: null}
        }
        default:
            return state
            break
    }
}