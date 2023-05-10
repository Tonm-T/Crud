import { Request,Response } from "express";
import { AppDataSource } from "../data-source";
import {Rol} from "../models/Rol"
import { ok } from "assert";
import { create } from "domain";
import { User } from "../models/User";

const RolRepository = AppDataSource.getRepository(Rol);

class RolController{

    // Crear Rol
    static createRol = async (req:Request, res:Response) => {
        const {Type, Description} = req.body

        try {

            const rol = new Rol()
            rol.Type = Type
            rol.Description = Description

            await RolRepository.save(rol)
            return res.json({
                ok: true,   
                msg: "rol create",
            });
            
        } catch (error) {
            return res.json({
                ok: false,
                msg: `Error -> ${error}`,
            });   
        }
    }

    // Obtener Todos
    static getRol = async (req:Request, res:Response) => {
        try {

            const rol = await RolRepository.find({

                where: {state: true},
            });

            return rol.length > 0 
            ? res.json({ok: true, rol})
            : res.json({ok: false, msg: "rol does not exist"})

            
        } catch (error) {
            return res.json({
                ok: false,
                msg: `Error -> ${error}`,
            });    
        }
    }

    //Obtener por Id
    static getById = async (req:Request, res:Response) =>{
        const Id = parseInt (req.params.Id)

        try {

            const rol = await RolRepository.findOne({
                where: {Id}
            })
             return rol ? res.json({
                ok: true, rol
             })
             : res.json({
                ok: false, msg: "rol no exist"
             });
            
        } catch (error) {
            return res.json({
                ok: false,
                msg: `Error -> ${error}`,
            });   
        }
    }

    //  Actualizar
    static updateRol = async (req:Request, res:Response) =>{
        const id = parseInt(req.params.id);

        const {Type, Description} = req.body;
        const repoRol = AppDataSource.getRepository(Rol);
        let rol: Rol;

        try {

            rol = await repoRol.findOneOrFail({
                where: {state:true},
            })

            if(!rol) {
                throw new Error("Rol dont exist in data base")
            }

            rol.Type = Type
            rol.Description = Description

            await repoRol.save(rol);
            return res.json({
                ok: true,
                msg: "rol was updadte"
            });
            
        } catch (error) {
            return res.json({
                ok: false,
                msg: "server error",
            });   
        }
    }

    //Eliminar
    static deleteRol = async (req: Request, res: Response) => {
        const Id = parseInt(req.params.id);
        const repoRol = AppDataSource.getRepository(Rol); 
        try {
          const rol = await repoRol.findOne({ where: { Id } });
          if (!rol) {
            throw new Error("Rol does not exist in the database");
          }
          const newRol = 1; // ID del nuevo rol al que se asignarán los usuarios  
          const repoUser = AppDataSource.getRepository(User);

          // Buscar el nuevo rol al que se asignarán los usuarios
          const nuevoRol = await repoRol.findOne({ where: { Id: newRol } });
          if (!nuevoRol) {
            throw new Error("New role does not exist in the database");
          }
          // Buscar todos los usuarios con el rol que se va a eliminar
          const userRol = await repoUser.find({
            where: {
              rol: {
                Id: Id,
              },
            },
          });
          // Actualizar el campo de rol de cada usuario encontrado y asignar el nuevo rol
          userRol.forEach(async (user) => {
            user.rol = nuevoRol;
            await repoUser.save(user);
          });
      
          rol.state = false;
          await repoRol.save(rol);
          return res.json({
            ok: true,
            msg: "Rol deleted",
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            ok: false,
            msg: "Server error",
          });
        }
    };


}

export default RolController