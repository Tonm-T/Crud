import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import { ok } from "assert";

const UserRepository = AppDataSource.getRepository(User);

// crear un registro
class UserController {

    static createUser =async (req:Request, res:Response) => {

        const {Name,age} = req.body

        try {

            const user = new User()
            user.Name = Name
            user.age = age

            await UserRepository.save(user)
            return res.json({
                ok: true,
                msg: "user was save",
            });

        } catch (error) {
            return res.json({
                ok: false,
                msg: `Error -> ${error}`,
            });
        }
        
    };
// obtener todos
    static getUsers = async (req:Request, res:Response) =>{
        try {
            const user = await UserRepository.find({
                where: {state: true},
            });

            return user.length > 0 
            ? res.json({ok : true, user})
            : res.json({ok: false, msg: "user not found"});

        } catch (error) {
            return res.json({
                ok: false,
                msg: `Error => ${error}`
            })
        }
    }
// obtener por id
    static getById = async (req:Request, res:Response) =>{
        const Id = parseInt (req.params.id) 
        try {
            
            const user = await UserRepository.findOne({
                where: {Id}
            })

            return user ? res.json({
                ok : true, user
            })
            : res.json({
                ok: false, msg: "user not found"
            });

        } catch (error) {
            return res.json({
                ok: false,
                msg: `Error => ${error}`
            })
        }
    }

    // Metodo para Actualizar
    static updateUser = async (req:Request, res:Response) =>{
        const id = parseInt(req.params.id);

        const { Name, age} = req.body;
        const repoUser = AppDataSource.getRepository(User);
        let user: User;
        try {

            user = await repoUser.findOneOrFail({

                where: {state: true},

            });

            if (!user) {
                throw new Error("User dont exist in data base");
            }

            user.Name = Name
            user.age = age
            await repoUser.save(user);
            return res.json({
                ok: true,
                msg: "user was updadte"
            })

        } catch (error) {
            return res.json({
                ok: false,
                msg: "Server Error"
            });
        }
    }

    //Eliminar

    static delteUser = async (req:Request, res:Response) =>{
        const Id = parseInt(req.params.id);
        const repoUser = AppDataSource.getRepository(User);
        try {

            const user = await repoUser.findOne({
                where: {Id},
            });

            console.log(user)
            if(!user) {
                throw new Error("User don't exist in data base");
            }
            user.state = false;
            await repoUser.save(user);
            return res.json({
                ok: true,
                msg: "user was delete"
            })

        } catch (error) {
            return res.json({
                ok: false,
                msg: "Delete Error"
            }) ;
        }
    }
}



export default UserController;