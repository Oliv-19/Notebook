import { Hono } from "hono";

const app = new Hono()


app.post('/api/', async (c) => {
    return c.json('hello world')
    
})

export default app