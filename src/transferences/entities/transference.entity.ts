import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transference {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    id_sender: number

    @Column()
    id_receptor: number

    @Column()
    amount: number

    @Column()
    sender_account: string

    @Column()
    receptor_account: string
}
