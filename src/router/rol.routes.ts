import { Router } from "express";
import RolController from "../controllers/rol.controller";
import { checkAuth } from "../verifytoken/verify";


const routes = Router()

const rol = RolController

routes.post("/", rol.createRol)

routes.get("/", checkAuth ,  rol.getRol)

routes.get("/id", rol.getById)

routes.put("/:id", rol.updateRol)

routes.delete("/:id", rol.deleteRol)



export default routes