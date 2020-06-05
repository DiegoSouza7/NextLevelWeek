import { Request, Response } from 'express'
import db from '../database/connection'

class ItemsController {
    async index(req: Request, res: Response) {
        const items = await db('items').select('*')
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.0.3:3333/uploads/${item.image}`
            }
        })
    
        return res.json(serializedItems)
    }
}

export default ItemsController