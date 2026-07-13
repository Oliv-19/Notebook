import { Hono } from "hono";

const app = new Hono()


app.post('/api/upload-pdf', async (c) => {
    try {
        const body = await c.req.parseBody()
        const file = body['pdf']
        if(!file || !(file instanceof File)){
            return c.json({error: 'No PDF file uploaded'}, 400)
        }

        const apiFormData = new FormData();
        apiFormData.append('File', file)
        apiFormData.append('StoreFile', 'true')
        apiFormData.append('ScaleImage', 'true')
        apiFormData.append('ImageWidth', '1200')

        const response = await fetch(`https://v2.convertapi.com/convert/pdf/to/png`, {
            method: 'POST',
            body: apiFormData,
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${c.env.API_KEY}`
            }
        }
        )
        if( !response.ok){
            const error = await response.text()
            return c.json({error: 'Converion failed', details: error})
        }
        const data= await response.json()
        const pageImgUrls = data.Files.map(file => file.Url)
        return c.json({pages: pageImgUrls})

    } catch (error){
        console.error(error);
        
    }
})

export default app