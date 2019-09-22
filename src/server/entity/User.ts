import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm'

@Entity('users')
@Unique(['sub'])
export class User {
  @PrimaryColumn()
  id: number

  @Column()
  sub: string

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date
}
