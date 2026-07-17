export async function saveCanvas(canvas){
    const jsonData = JSON.stringify(canvas.toJSON())
    localStorage.setItem('canvas', jsonData)
}

export async function getCanvas() {
    const canvasJson = localStorage.getItem('canvas')
    return JSON.parse(canvasJson) 
}