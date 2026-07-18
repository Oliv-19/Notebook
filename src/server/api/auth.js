import { auth } from '../middlewares/auth'
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import bcrypt from 'bcryptjs';
import * as schema from '../db/schema'
import { sign } from "hono/jwt";
import { deleteCookie, setCookie } from "hono/cookie";
import { eq } from "drizzle-orm";
const authApi = new Hono()

authApi.post('/api/signup', async (c) => {
    const {email, password} = await c.req.json()
    const db = drizzle(c.env.DB, schema)
    try{
        const passwordHash = await bcrypt.hash(password, 10)
        const [user] = await db
            .insert(schema.users)
            .values({email, passwordHash})
            .returning()
        if(user) {
            const token = await sign({id: user.id, email}, c.env.JWT, 'HS256')
            setCookie(c, 'auth_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'Lax',
                maxAge: 60 * 60 * 24 * 31
            })
            return c.json({success: true, id: user.id})
        }

        return c.json({success: false, error: "Could not Sign Up"}, 400)
    } catch (e){
        console.error(e.message);
        return c.json({success: false}, 400)
        
    }
})

authApi.post('/api/login', async (c) => {
    const {email, password} = await c.req.json()
    const db = drizzle(c.env.DB, schema)
    try{
        const [user] = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email))
        if (user){
            const valid = await bcrypt.compare(password, user.passwordHash)
            if(valid){
                const token = await sign({id: user.id, email}, c.env.JWT, 'HS256')
                setCookie(c, 'auth_token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'Lax',
                    maxAge: 60 * 60 * 24 * 31
                })
                return c.json({success: true, id: user.id})
            }else {
                return c.json({success: false, error: 'Invalid Credentials'}, 401)

            }
        }
        return c.json({success: false, error: 'User not found'}, 404)
    } catch (e){
        console.error(e.message)
        return c.json({success: false}, 400)
        
    }
})

authApi.get('/api/logout', auth, async(c)=> {
    deleteCookie(c, 'auth_token')
    return c.json({loggedIn: false})

})

authApi.get('/api/checkCredentials', auth, async (c) => {
    const user = c.get('user')
    
    return user ? c.json({loggedIn: true, id: user.id}) : c.json({loggedIn: false})
})

export default authApi