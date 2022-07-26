import { Request, Response } from 'express'
import { roomRepository } from 'repositories/RoomRepository'

export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body

    try {
      const newRoom = roomRepository.create({ name, description })
    } catch (error) {
      return res.status(404).json({ message: `${error}` })
    }
  }
}
