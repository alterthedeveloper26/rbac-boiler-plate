import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  username: string;

  @Column()
  password: string;
}
