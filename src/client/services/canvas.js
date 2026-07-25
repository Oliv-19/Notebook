export async function saveCanvas(canvas, notebookId){
    const response = await fetch('/api/save-note',{
        method: 'POST',
        body: JSON.stringify({canvasData: canvas.toJSON(), notebookId})
    })
    if(!response.ok) return null
    const data = await response.json()
    return
}

export async function getCanvas(id) {
    const response = await fetch(`/api/get-note/${id}`)
    if(!response.ok) return null
    const data = await response.json()
    return JSON.parse(data.canvas)
}