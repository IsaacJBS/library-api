import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('rooms')
export class Rooom {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string
}
