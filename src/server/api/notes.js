import { Hono } from "hono";

const notesApi = new Hono()
notesApi.get('/api/pdf', async (c) => {
    const {noteData} = await c.req.json()
    
})

export default notesApi