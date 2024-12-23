import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Harvest } from '../../harvests/entities/harvest.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Harvest, harvest => harvest.user)
  harvests: Harvest[];
}