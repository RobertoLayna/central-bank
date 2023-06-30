import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bank {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ unique: true, nullable: false })
    name: string

    @Column({ nullable: false })
    description: string

    @Column({ default: 0 })
    status?: number
}
