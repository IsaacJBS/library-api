import { Request, Response } from 'express'
import { SubjectRepository } from '../repositories/SubjectRepository'

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body

    if (!name) {
      return res.status(400).json('O nome da disciplina é obrigatório')
    }

    try {
      const newSubject = SubjectRepository.create({
        name,
      })

      await SubjectRepository.save(newSubject)

      return res.status(201).json(newSubject)
    } catch (error) {
      return res.status(404).json({ message: `${error}` })
    }
  }
}
