import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import validateResult from "../helpers/validate.helpers";

//validacion de campos de roles
export const rolValidate = [

    check('Type')
    .exists()
    .not()
    .isEmpty(),
    check('Description')
    .exists()
    .not()
    .isEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req,res,next)
    },
]