import { Router } from "express";
import UserController from "../controllers/user.controller";
import { checkAuth } from "../verifytoken/verify";
const {verifytoken} = require('../models/auth')

//Rutas de usuarios
const routes = Router()
const user = UserController

routes.post("/", user.createUser)

routes.get("/", checkAuth, user.getUsers)

routes.put("/:id", user.updateUser)

routes.get("/:id", user.getById)

routes.post('/login', user.login )

routes.delete("/:id",user.delteUser)

export default routes