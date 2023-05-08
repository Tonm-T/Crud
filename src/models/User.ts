import {Entity, PrimaryGeneratedColumn,Column} from "typeorm";


@Entity()
export class User{

    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    Name: string

    @Column()
    age: number

    @Column({default:true})
    state: boolean


}