import { Request, Response } from 'express'

export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body

    try {
    } catch (error) {
      return res.status(404).json({ message: `${error}` })
    }
  }
}
