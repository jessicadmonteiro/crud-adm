import { Request, Response, NextFunction } from "express"
import { AppError } from "../error"

const ensureAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const authenticatedUser = req.user.admin

    if(!authenticatedUser){
        throw new AppError("Insufficient Permission", 403)
    }

    return next()
}

export{
    ensureAdminMiddleware
}