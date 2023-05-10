import { Router } from "express";
import RolController from "../controllers/rol.controller";

const routes = Router()
const rol = RolController

routes.post("/", rol.createRol)

routes.get("/", rol.getRol)

routes.get("/id", rol.getById)

routes.put("/:id", rol.updateRol)

routes.delete("/:id", rol.deleteRol)



export default routes