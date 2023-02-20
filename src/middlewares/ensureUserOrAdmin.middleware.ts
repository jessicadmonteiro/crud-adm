import { Request, Response, NextFunction } from "express"
import { QueryConfig } from "pg"
import { AppError } from "../error"
import { client } from "../databade"
import { iUserResult } from "../interfaces/users.interface"

const ensureUserOrAdminMiddleware = async (req: Request, res: Response, next: NextFunction):Promise<Response | void>  => {

    const userId: number = parseInt(req.params.id)
    const idUserLogado: number = req.user.id
    
    const queryUser: string = `
        SELECT
            u."id",
            u."name",
            u."email",
            u."admin",
            u."active" 
        FROM
        users u
        WHERE  "id" = $1;
    `
    const queryConfigUser: QueryConfig = {
        text: queryUser,
        values: [idUserLogado]
    } 

    const queryResultUser: iUserResult = await client.query(queryConfigUser)

    const admin = queryResultUser.rows[0].admin

    if(!admin && userId !== idUserLogado){

        throw new AppError("Insufficient Permission", 403)
    }

    return next()
}

export {
    ensureUserOrAdminMiddleware
}