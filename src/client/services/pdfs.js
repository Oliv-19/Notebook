export async function getPdf(url){
    const res = await fetch(`/api/pdf?url=${encodeURIComponent(url)}`)
    if(!res.ok) return null
    const blob = await res.blob()
    return blob
}