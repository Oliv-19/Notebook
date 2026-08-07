import * as fabric from 'fabric'

export function canvasSettingsReducer(state, action){
    switch(action.type){
        case 'SET_BRUSH_COLOR':
            return {...state, brushColor: action.payload}
            break
        case 'SET_BRUSH_SIZE':
            return {...state, brushSize: action.payload}
            break  
        case 'SET_BACKGROUND_STYLE': {
            const {hiddenCanvas, canvas, style}= action.payload
            const ctx = hiddenCanvas.getContext('2d')
            if(canvas){
                if(style == 'none'){
                    canvas.backgroundColor = state.backgroundColor
                    canvas.renderAll()
                    return {...state}
                    break
                }else if(style == 'grid'){
                    hiddenCanvas.width = 30
                    hiddenCanvas.height = 30
                    ctx.fillStyle = state.backgroundColor
                    ctx.fillRect( 0, 0, 30, 30 )
                    ctx.strokeStyle = '#e0e0e0'
                    ctx.lineWidth= 1
                    ctx.beginPath()
                    ctx.moveTo(30, 0)
                    ctx.lineTo(0, 0)
                    ctx.lineTo(0, 30)
                    ctx.stroke()
                } else if(style == 'line'){
                    hiddenCanvas.width = 40
                    hiddenCanvas.height = 40
                    ctx.fillStyle = state.backgroundColor
                    ctx.fillRect( 0, 0, 40, 40 )
                    ctx.strokeStyle = '#e0e0e0'
                    ctx.lineWidth= 1
                    ctx.beginPath()
                    ctx.moveTo(0, 40)
                    ctx.lineTo(40, 40)
                    ctx.stroke()
                }
                canvas.backgroundColor = new fabric.Pattern({
                    source: hiddenCanvas,
                    repeat: 'repeat'
                })
                canvas.renderAll()
            }
            return {...state, backgroundPattern:style }
            break  
        }
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
            break
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
        
        default:
            return state
            break
    }
}

export function actionsReducer(state, action){
    switch(action.type){
        case 'UNDO': {
            const {canvas} = action.payload
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
            const {canvas} = action.payload
            const { redoStack} = state
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
        case 'SELECT_MODE': {
            const {canvas, isSelect} = action.payload
            if(canvas){
                canvas.isDrawingMode = !isSelect
                canvas.selection = isSelect
                return {
                    ...state,
                    isSelection : isSelect
                }
            }
            break
        }
        case 'DELETE':{
            const {canvas} = action.payload
            if(canvas){
                const activeObjects = canvas.getActiveObjects()
                if(activeObjects.length > 0){
                    canvas.discardActiveObject()
                    activeObjects.forEach(obj => {
                        canvas.remove(obj)
                    })
                    canvas.renderAll()
                }
                return {...state}
            }
            break
        }
        case 'UPLOAD_IMG':{
            const {data, hiddenCanvas, canvas} = action.payload
            if(canvas && hiddenCanvas){
                if(data.type?.includes('image')){
                    const reader = new FileReader()
                    reader.readAsDataURL(data)
                    reader.onload = (url)=>{
                        const base64URL = url.target.result
                    
                        const img = new Image()
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
                    }
                }else {
                    fabric.FabricImage.fromURL(data, {crossOrigin: 'anonymous'})
                      .then(img => {
                        img.set({
                            left: 320,
                            top: 450,
                            scaleX: 0.5,
                            scaleY: 0.5
                        })
                        canvas.add(img)
                        canvas.renderAll()
                      })              

                }
                return {...state}
            }
            break
        } 
        case 'ADD_RECT':{
            const {canvas} = action.payload
            if(canvas){
                const rect = new fabric.Rect({
                    left:100,
                    top: 100,
                    width:150,
                    height: 100,
                    fill:'red'
                })
                canvas.add(rect)
            }
            return {...state}
            break
        } 
        case 'ADD_CIRCLE':{
            const {canvas} = action.payload
            if(canvas){
                const rect = new fabric.Circle({
                    left:100,
                    top: 100,
                    radius:50,
                    fill:'red'
                })
                canvas.add(rect)
            }
            return {...state}
            break
        }
        case 'ADD_CARTESIAN_PLANE':{
            const {canvas, hiddenCanvas} = action.payload
            if(canvas && hiddenCanvas){
                hiddenCanvas.width= 400
                hiddenCanvas.height= 400
                const ctx = hiddenCanvas.getContext('2d')
                ctx.fillStyle = 'transparent'
                ctx.fillRect(0, 0, hiddenCanvas.width, hiddenCanvas.height)
                
                const marginLeft = 50
                const marginBottom = 40
                const planeWidth = hiddenCanvas.width - marginLeft - 30
                const planeHeight = hiddenCanvas.height - marginBottom - 30

                ctx.strokeStyle = '#333333'
                ctx.lineWidth = 2

                ctx.beginPath()
                ctx.moveTo(marginLeft, 30)
                ctx.lineTo(marginLeft, 30 + planeHeight)
                
                ctx.lineTo(marginLeft + planeWidth, 30 + planeHeight)
                ctx.stroke()

                const graph = hiddenCanvas.toDataURL('image/png')
                fabric.FabricImage.fromURL(graph)
                .then(img => {
                    img.scaleToWidth(400)
                    img.set({
                        left: 320,
                        top: 450,
                        selectable: true
                    })
                    canvas.add(img)
                    canvas.renderAll()
                }, {crossOrigin: 'anonymous'})        
            }
            return {...state}
            break
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
            break
        }
        case 'RESET_PDF':{
            return {...state, pdf: null}
            break
        }
        default:
            return state
            break
    }
}