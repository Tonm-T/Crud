import { User } from "./User";

import jwt from "jsonwebtoken"

//Generar token
export const tokenSign = async (user:User) => {
    return jwt.sign(
        {
            _Id: user.Id,
            role: user.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2H"// Tiempo de session
        }
    );
}

// Verfifica el token
export const verifytoken = async (token : string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}