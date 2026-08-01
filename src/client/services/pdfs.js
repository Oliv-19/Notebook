export async function getPdf(url){
    const res = await fetch(`/api/pdf?url=${encodeURIComponent(url)}`)
    if(!res.ok) return null
    const blob = await res.blob()
    return blob
}

export async function savePdf(url, notebookId){
    const res = await fetch(`/api/save-pdf`, {
        method: 'POST',
        body:  JSON.stringify({ pdf: url, notebookId})
    })
    if(!res.ok) return null
    return
}