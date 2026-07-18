import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export const auth = createMiddleware(async(c, next) => {
    const token = getCookie(c, 'auth_token')
    if (!token) return c.json('Unauthorized', 401)
    try{
        const payload = await verify(token, c.env.JWT, 'HS256')
        c.set('user', payload)
        await next()
    } catch(e){
        console.error('Middleware error: ', e)
        return c.json({error: 'Invalid Token'}, 401)
    }
}) 