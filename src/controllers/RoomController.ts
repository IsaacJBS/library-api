import { Request, Response } from 'express'
import { videoRepository } from '../repositories/VideoRepository'
import { roomRepository } from '../repositories/RoomRepository'

export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body

    try {
      const newRoom = roomRepository.create({ name, description })
      await roomRepository.save(newRoom)

      return res.status(201).json(newRoom)
    } catch (error) {
      return res.status(404).json({ message: `${error}` })
    }
  }

  async createVideo(req: Request, res: Response) {
    const { title, url } = req.body
    const { idClass } = req.params

    try {
      const room = await roomRepository.findOne({
        where: { id: Number(idClass) },
      })

      if (!room) {
        return res.status(404).json({ message: 'A aula informada não existe' })
      }

      const newVideo = videoRepository.create({ title, url, room })

      await videoRepository.save(newVideo)

      return res.status(201).json(newVideo)
    } catch (error) {
      return res.status(404).json({ message: `${error}` })
    }
  }
}
