import * as fabric from 'fabric'

const getViewportCenter = (canvas) => {
    if (!canvas) return
    const canvasBoundingRect = canvas.lowerCanvasEl.getBoundingClientRect()
  
    const windowHeight = window.innerHeight
    const screenCenterYInWindow = windowHeight / 2
    const centerY = screenCenterYInWindow - canvasBoundingRect.top
    const centerX = canvas.width/2
    return {centerX, centerY}
}

export function canvasSettingsReducer(state, action){
    switch(action.type){
        case 'SET_BRUSH_COLOR':
            return {...state, brushColor: action.payload}
            break
        case 'SET_BRUSH_SIZE':
            return {...state, brushSize: action.payload}
            break  
        case 'SET_BACKGROUND_STYLE': {
            const {hiddenCanvas, canvas, style, theme}= action.payload
            const ctx = hiddenCanvas.getContext('2d')
            const {bg, lines} = theme || state.backgroundTheme
            if(canvas){
                if(style == 'none'){
                    canvas.backgroundColor = bg
                    canvas.requestRenderAll()
                    return {...state, backgroundPattern:style || state.backgroundPattern, backgroundTheme: theme || state.backgroundTheme}
                    break
                }else if(style == 'grid'){
                    hiddenCanvas.width = 30
                    hiddenCanvas.height = 30
                    ctx.fillStyle = bg
                    ctx.fillRect( 0, 0, 30, 30 )
                    ctx.strokeStyle = lines
                    ctx.lineWidth= 1
                    ctx.beginPath()
                    ctx.moveTo(30, 0)
                    ctx.lineTo(0, 0)
                    ctx.lineTo(0, 30)
                    ctx.stroke()
                } else if(style == 'line'){
                    hiddenCanvas.width = 40
                    hiddenCanvas.height = 40
                    ctx.fillStyle = bg
                    ctx.fillRect( 0, 0, 40, 40 )
                    ctx.strokeStyle = lines
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
                canvas.requestRenderAll()
            }
            return {...state, backgroundPattern:style || state.backgroundPattern, backgroundTheme: theme || state.backgroundTheme}
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
            const newUndoStack= [...undoStack]
            if(canvas == action.payload) return state
            if(undoStack.length > 20) newUndoStack.shift()
            return {
                ...state,
                redoStack: [],
                undoStack: [...newUndoStack, action.payload]
            }
            break
        }
        case 'UNDO': {
            const {canvas, undoStack, redoStack} = state
            const newRedoStack= [...redoStack]
            if(canvas && undoStack.length > 1){
                const currentState = undoStack[undoStack.length-1]
                const lastState = undoStack[undoStack.length-2]
                canvas.loadFromJSON(lastState)
                .then((loadedCanvas)=> {
                    loadedCanvas.requestRenderAll()
                    }) 
                if(redoStack.length > 20) newRedoStack.shift()
                return {
                    ...state,
                    undoStack: undoStack.slice(0, -1),
                    redoStack: [...newRedoStack, currentState]
                }
            }
            break
        
        }
        case 'REDO':{
            const {canvas, redoStack, undoStack} = state
            const newUndoStack= [...undoStack]
            if(canvas && redoStack.length <= 0){
                const nextState = redoStack[redoStack.length-1]
                canvas.loadFromJSON(nextState)
                .then((loadedCanvas)=> {
                    loadedCanvas.requestRenderAll()
                    }) 
                if(undoStack.length > 20) newUndoStack.shift()
                return {
                    ...state,
                    redoStack: redoStack.slice(0, -1),
                    undoStack:  [...newUndoStack, nextState]
                }
                
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
        case 'ERASER_MODE': {
            const {canvas, saveHistory} = action.payload
            if(canvas){

                canvas.isDrawingMode = true
                const brush = new fabric.PencilBrush(canvas)
                brush.width = 5
                canvas.freeDrawingCursor = 'default'
                // brush.color = '#ffffff'
                const eraserListener = (e) => {
                    const eraserPath = e.path
                    const objects = canvas.getObjects()
                    objects.forEach((obj) => {
                    if (obj !== eraserPath && obj.intersectsWithObject(eraserPath)) {
                        canvas.remove(obj)
                    }
                    })
                    canvas.remove(eraserPath)
                    canvas.requestRenderAll()
                    saveHistory(canvas)
                }
                canvas.freeDrawingBrush = brush
                canvas.off('path:created', eraserListener)
                canvas.on('path:created', eraserListener)
                return {
                    ...state
                }
            }
            break
        }
        case 'DRAWING_MODE': {
            const {canvas, brushSize, brushColor, saveHistory} = action.payload
            if(canvas){
                    canvas.isDrawingMode = true
                    canvas.freeDrawingCursor = 'crosshair'
                    const brush = new fabric.PencilBrush(canvas)
                    brush.width = brushSize
                    brush.color = brushColor
                    canvas.off('path:created')
                    canvas.on('path:created', (e)=> {
                        const path = e.path
                        path.set({
                            selectable: true,
                            evented: true
                        })
                        saveHistory(canvas)
                    })
                    canvas.freeDrawingBrush = brush
                    canvas.selection = false
                return {
                    ...state
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
                    canvas.requestRenderAll()
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
                            
                            const {centerX, centerY} = getViewportCenter(canvas)
                            fabric.FabricImage.fromURL(base64)
                            .then(img => {
                                img.set({
                                    left: centerX,
                                    top: centerY,
                                    scaleX: 0.5,
                                    scaleY: 0.5
                                })
                                canvas.add(img)
                                canvas.setActiveObject(img)
                                canvas.requestRenderAll()
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
                        canvas.setActiveObject(img)
                        canvas.requestRenderAll()
                      })              

                }
                return {...state}
            }
            break
        } 
        case 'ADD_RECT':{
            const {canvas, brushColor, saveHistory} = action.payload
            if(canvas){
                const {centerX, centerY} = getViewportCenter(canvas)
                const rect = new fabric.Rect({
                    left:centerX,
                    top: centerY,
                    width:150,
                    height: 100,
                    fill: brushColor
                })
                canvas.add(rect)
                canvas.setActiveObject(rect)
                saveHistory(canvas)
                
            }
            return {...state}
            break
        } 
        case 'ADD_CIRCLE':{
            const {canvas, brushColor, saveHistory} = action.payload
            if(canvas){
                const {centerX, centerY} = getViewportCenter(canvas)
                const circle = new fabric.Circle({
                    left:centerX,
                    top: centerY,
                    radius:50,
                    fill: brushColor
                })
                canvas.add(circle)
                canvas.setActiveObject(circle)
                saveHistory(canvas)
            }
            return {...state}
            break
        }
        case 'ADD_CARTESIAN_PLANE':{
            const {canvas, hiddenCanvas, saveHistory} = action.payload
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
                const {centerX, centerY} = getViewportCenter(canvas)
                fabric.FabricImage.fromURL(graph)
                .then(img => {
                    img.scaleToWidth(400)
                    img.set({
                        left: centerX,
                        top: centerY,
                        selectable: true
                    })
                    canvas.add(img)
                    canvas.setActiveObject(img)
                    canvas.requestRenderAll()
                    saveHistory(canvas)
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