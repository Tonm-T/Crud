import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import validateResult from "../helpers/validate.helpers";


export const userValidate = [
    check('rolId')
    .exists()
    .not()
    .isEmpty(),
    check('Email')
    .exists()
    .isEmail()
    .not()
    .isEmpty(),
    check('Password')
    .exists()
    .isLength({min: 4, max: 8})
    .not()
    .isEmpty(),
    check('Name')
    .exists()
    .not()
    .isEmpty(),
    check('age')
    .exists()
    .isNumeric()
    .not()
    .isEmpty(),
    //verificar devolver el error, o continuar el flujo
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req,res,next)
    },
]