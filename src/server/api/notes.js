import { Hono } from "hono";

const notesApi = new Hono()
notesApi.get('/api/notes', async (c) => {
    const {noteData} = await c.req.json()
    
})

export default notesApi