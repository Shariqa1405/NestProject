import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.templates, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'text' })
  templateText: string;

  @Column('json')
  preview: Record<string, any>;
}
