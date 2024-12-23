import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

// Definição da entidade "Harvest", que representa uma colheita
@Entity()
export class Harvest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  location: string;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column()
  seedType: string;

  @Column()
  fertilizer: string;

  @ManyToOne(() => User, user => user.harvests)
  user: User;
}