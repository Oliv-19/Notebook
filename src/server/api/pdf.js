import { Hono } from "hono";

const pdfApi = new Hono()
pdfApi.get('/api/pdf', async (c) => {
    const url = c.req.query('url')
    if(!url) return c.text('No url provided', 400)
    try{
        const res = await fetch(url)
        if(!res.ok){ 
            console.error("Couldn't get pdf file")
            
            return c.text("Couldn't get pdf file", 500)
        }
        const buffer = await res.arrayBuffer()
        return c.body(buffer, 200, {
            'Content-Type': 'application/pdf',
            'Content-Length': buffer.byteLength.toString(),
            'Access-Control-Allow-Origin': '*'
        })

    } catch (e) {
        console.error(e)
        return c.text('Server error', 500)
        
    }
    
})

export default pdfApi