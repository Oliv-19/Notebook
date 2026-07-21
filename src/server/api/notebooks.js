import { Hono } from "hono";
import * as schema from '../db/schema'
import { drizzle } from "drizzle-orm/d1";
import { auth } from "../middlewares/auth";
import { eq } from "drizzle-orm";

const notebooksApi = new Hono()
notebooksApi.post('/api/notebook', auth, async (c) => {
    const {name} = await c.req.json()
    const db = drizzle(c.env.DB, schema)
    const user = c.get('user')
    console.log(name, user);
    
    try{
        if(!user) return c.json({success:false, error: 'User not found'}, 404)
        const notebook = await db
        .insert(schema.userNotebook)
        .values({
            userId: user.id,
            name: name
        })
        return c.json({success: true}, 201)

    } catch (e){
        console.error(e)
        return c.json({success:false}, 400)
        
    }
    
})

notebooksApi.get('/api/notebook', auth, async (c) => {
    const db = drizzle(c.env.DB,{schema})
    const user = c.get('user')
    
    try{
        if(!user) return c.json({success:false, error: 'User not found'}, 404)
        const notebook = await db.query.userNotebook.findMany({
            where: eq(schema.userNotebook.userId, user.id),
            
        })
        if(!notebook) c.json({success:false, error: 'Notebooks not found'}, 404)
        return c.json(notebook, 200)

    } catch (e){
        console.error(e)
        return c.json({success:false}, 400)
        
    }
    
})

notebooksApi.delete('/api/notebook', async(c) => {
    const db = drizzle(c.env.DB, schema)
    try{
        await db
        .delete(schema.userNotebook)
        return c.json({success:true}, 200)
    } catch (error){
        console.error(error.cause);
        return c.json({success:false}, 400)
    }
})

export default notebooksApi