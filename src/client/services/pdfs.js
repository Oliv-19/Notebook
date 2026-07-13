export async function uploadPdf(pdf){
    console.log('call');
    
    const response = await fetch('/api/upload-pdf', {
        method: 'POST',
        body: pdf
    })

    const data = await response.json()
    if(!data.pages && data?.pages?.length == 0 ) return null
    return data.pages
}