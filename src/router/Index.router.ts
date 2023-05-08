//importaciones
import dotenv from "dotenv"
import { Router } from "express";
import { env } from "process";

//importacion de nuestras rutas de la clase
import routesUser from './user.router'

dotenv.config()
const URL = process.env.URL

const routes = Router()
//rutas
routes.use(`${URL}/user`, routesUser)


export default routes