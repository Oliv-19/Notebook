import { Hono } from "hono";
import * as schema from '../db/schema'
import { drizzle } from "drizzle-orm/d1";
import { auth } from "../middlewares/auth";
import { and, eq } from "drizzle-orm";

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

pdfApi.post('/api/save-pdf', auth, async (c) => {
    const {pdf, notebookId} = await c.req.json()
    console.log(pdf);
    
    const db = drizzle(c.env.DB, {schema})
    const user = c.get('user')
    
    try{
        if(!user) return c.json({success:false, error: 'User not found'}, 404)
        if (!pdf) {
            return c.json({success:false, error: 'PDF URL not found' }, 404);
        }
        
        const [files]= await db
        .insert(schema.notebookFiles)
        .values({pdfUrl: pdf, notebookId: notebookId})
        .returning()
        
        return c.json({success: true}, 201)

    } catch (e){
        console.error(e)
        return c.json({success:false}, 400)
        
    }
})

export default pdfApi