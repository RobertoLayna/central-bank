import { Account } from 'src/accounts/entities/account.entity';
import { Bank } from 'src/banks/entities/bank.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  rfc: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column()
  id_bank: number;

  @ManyToOne(() => Bank, (bank) => bank.id, { nullable: false })
  @JoinColumn({
    name: 'id_bank',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'user_bank',
  })
  bank?: Bank;

  @OneToMany(() => Account, (acc) => acc.user)
  account: Account[];
}
