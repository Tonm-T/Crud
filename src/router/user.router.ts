import { Router } from "express";
import UserController from "../controllers/user.controller";


const routes = Router()
const user = UserController

routes.post("/", user.createUser)

routes.get("/", user.getUsers)

routes.put("/:id", user.updateUser)

routes.get("/:id", user.getById)

routes.delete("/:id",user.delteUser)

export default routes