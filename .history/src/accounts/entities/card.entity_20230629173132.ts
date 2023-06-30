import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  id_account: number;

  @Column()
  card: string;

  @ManyToOne(() => Account, (user) => user)
  @JoinColumn({
    name: 'id_account',
    foreignKeyConstraintName: 'account_card',
  })
  account?: Account;

  @Column()
  card_account: number;

  @Column({ default: 0, nullable: false })
  status: number;
}
