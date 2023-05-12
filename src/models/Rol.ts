import { Entity, PrimaryGeneratedColumn, Column, OneToMany,  } from "typeorm";
import { User } from "./User";


//Creacion de nuestra  entidad Rol
@Entity()
export class Rol{
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    Type: string

    @Column()
    Description: string

    @Column({default:true})
    state: boolean

    @OneToMany(()=>User,(user) => user.Id)
    user: User
}