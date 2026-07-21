export const createNB = async(name) => {
    const response = await fetch('/api/notebook',{
        method: 'POST',
        body: JSON.stringify({name})
    })
    if(!response.ok) return null
    return
}

export const getUserNotebooks = async() => {
    const response = await fetch('/api/notebook')
    
    const data = await response.json()
    return data
}