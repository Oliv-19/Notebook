import { Hono } from "hono";
import * as schema from '../db/schema'
import { drizzle } from "drizzle-orm/d1";
import { auth } from "../middlewares/auth";
import { and, eq } from "drizzle-orm";

const notebooksApi = new Hono()
notebooksApi.post('/api/notebook', auth, async (c) => {
    const {name} = await c.req.json()
    const db = drizzle(c.env.DB, schema)
    const user = c.get('user')
    console.log(name, user);
    
    try{
        if(!user) return c.json({success:false, error: 'User not found'}, 404)
        
        const [notebook] = await db
        .insert(schema.userNotebook)
        .values({
            userId: user.id,
            name: name,
        }).returning()
        return c.json({notebook}, 201)

    } catch (e){
        console.error(e)
        return c.json({success:false}, 400)
        
    }
    
})

notebooksApi.post('/api/save-note', auth, async (c) => {
    const {canvasData, notebookId} = await c.req.json()
    const db = drizzle(c.env.DB, {schema})
    const user = c.get('user')
    
    try{
        if(!user) return c.json({success:false, error: 'User not found'}, 404)
        if (!canvasData) {
            return c.json({success:false, error: 'Canvas data not found' }, 404);
        }
        
        const notebook = await db.update(schema.userNotebook)
        .set({canvasInfo: JSON.stringify(canvasData)})
        .where(and(
            eq(schema.userNotebook.userId, user.id),
            eq(schema.userNotebook.id, notebookId),
        ))
        
        return c.json({success: true}, 201)

    } catch (e){
        console.error(e)
        return c.json({success:false}, 400)
        
    }
    
})
notebooksApi.get('/api/get-note/:id', auth, async (c) => {
    const id = await c.req.param('id')
    const db = drizzle(c.env.DB, {schema})
    const user = c.get('user')
    
    try{
        if(!user) return c.json({success:false, error: 'User not found'}, 404)
        const notebook = await db.query.userNotebook.findFirst({
            where: (and(
                eq(schema.userNotebook.userId, user.id),
                eq(schema.userNotebook.id, id),
            )),
            with:{
                file: true
            }
        })
        if(!notebook) return c.json({success:false ,error:'Notebook not found'}, 400)
        
        return c.json({canvas: notebook.canvasInfo, pdf: notebook.file.pdfUrl}, 200)

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
notebooksApi.get('/api/delete-notebook/:id', auth, async(c) => {
    const id = await c.req.param('id')
    const db = drizzle(c.env.DB, schema)
    const user = c.get('user')
    try{
        await db
        .delete(schema.userNotebook)
        .where(and(
            eq(schema.userNotebook.id, id),
            eq(schema.userNotebook.userId, user.id)
        ))
        return c.json({success:true, deleted: `id: ${id}`}, 200)
    } catch (error){
        console.error(error);
        return c.json({success:false}, 400)
    }
})

export default notebooksApi