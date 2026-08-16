export const createNB = async(name, style = null) => {
    const response = await fetch('/api/notebook',{
        method: 'POST',
        body: JSON.stringify({name, style})
    })
    if(!response.ok) return null
    const data = await response.json()
    return data.notebook
}

export const getUserNotebooks = async() => {
    const response = await fetch('/api/notebook')
    
    const data = await response.json()
    return data
}

export const saveCurrNotebook = (notebook) => {
    localStorage.setItem('notebook', JSON.stringify(notebook))
    return
}

export const getCurrNotebook = () => {
    const notebook = localStorage.getItem('notebook')
    return JSON.parse(notebook)
}

export const deleteNotebook = async(id) => {
    const response = await fetch(`/api/delete-notebook/${id}`)
    
    const data = await response.json()
    return data
}

export const editNotebook = async(id, newName, color) => {
    const response = await fetch(`/api/edit-notebook`, {
        method: 'PUT',
        body: JSON.stringify({notebookId: id, newName, notebookStyle:color})
    })
    if(!response.ok) return null
    return 
}