export async function saveCanvas(canvas, notebookId, pdf=null){
    
    const response = await fetch('/api/save-note',{
        method: 'POST',
        body: JSON.stringify({
            canvasData: canvas, 
            notebookId,
            pdf
        })
    })
    if(!response.ok) return null
    const data = await response.json()
    return
}

export async function getCanvas(id) {
    const response = await fetch(`/api/get-note/${id}`)
    if(!response.ok) return null
    const data = await response.json()
    return {savedCanvas: JSON.parse(data.canvas), pdf: data.pdf}
}