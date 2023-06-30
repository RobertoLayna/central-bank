import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  id_user: number;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({
    name: 'id_user',
    foreignKeyConstraintName: 'account_user',
  })
  user?: User;

  @Column({ default: 0, nullable: false })
  status: number;
}
