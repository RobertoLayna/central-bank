import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  id_account: number;

  @Column()
  card: string;

  @ManyToOne(() => Account, (acc) => acc.card)
  @JoinColumn({
    name: 'id_account',
    foreignKeyConstraintName: 'account_card',
  })
  account?: Account;

  @Column()
  card_account: string;

  @Column({ default: 0, nullable: false })
  status: number;
}
