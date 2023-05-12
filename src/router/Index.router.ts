//importaciones
import dotenv from "dotenv"
import { Router } from "express";

//importacion de nuestras rutas de la clase
import routesUser from './user.router'
import routesRoles from "./rol.routes";

dotenv.config()
const URL = process.env.URL

const routes = Router()
//rutas
routes.use(`${URL}/user`, routesUser)

routes.use(`${URL}/rol`, routesRoles)


export default routes