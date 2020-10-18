import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export default class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
  
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  reset_token: string;

  @Column()
  reset_token_expires: string;
}