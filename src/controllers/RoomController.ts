import { Request, Response } from 'express'
import { videoRepository } from '../repositories/VideoRepository'
import { roomRepository } from '../repositories/RoomRepository'
import { SubjectRepository } from '../repositories/SubjectRepository'

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

  async createSubject(req: Request, res: Response) {
    const { subject_id } = req.body
    const { idClass } = req.params

    try {
      const room = await roomRepository.findOne({
        where: { id: Number(idClass) },
      })

      if (!room) {
        return res.status(404).json({ message: 'A aula informada não existe' })
      }

      const subject = await SubjectRepository.findOneBy({
        id: subject_id as number,
      })

      if (!subject) {
        return res.status(404).json({ message: 'A disciplina não existe' })
      }

      const roomUpdate = {
        ...room,
        subjects: [subject],
      }

      await roomRepository.save(roomUpdate)

      return res.status(204).send()
    } catch (error) {
      return res.status(404).json({ message: `${error}` })
    }
  }

  async list(req: Request, res: Response) {
    try {
      const rooms = await roomRepository.find({
        relations: {
          subjects: true,
        },
      })

      return res.json(rooms)
    } catch (error) {
      return res.status(404).json({ message: `${error}` })
    }
  }
}
