import {Entity, PrimaryGeneratedColumn,Column, ManyToOne} from "typeorm";
import { Rol } from "./Rol";


@Entity()
export class User{

    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    Name: string

    @Column()
    age: number

    @ManyToOne(()=>Rol, (rol)=> rol.user)
    rol: Rol

    @Column({default:true})
    state: boolean

    @Column()
    Email: string

    @Column()
    Password: string


}