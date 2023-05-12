import { token } from "morgan"
import {verifytoken} from "../models/auth"

import { Request, Response, NextFunction } from "express"

//Metodo de Verificacion de token
export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ').pop()
        console.log(token)
        const tokenData = await verifytoken(token)
        console.log(tokenData)
        if (tokenData) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'access denied'})
        }
    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({error: 'access denied'})
    }
}