import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  expirationDate: Date;
}
