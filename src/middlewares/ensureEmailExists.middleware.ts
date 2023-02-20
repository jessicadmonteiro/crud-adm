import { Request, Response, NextFunction } from "express"
import { QueryConfig, QueryResult } from "pg"
import { client } from "../databade"
import { AppError } from "../error"


const ensureEmailExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const queryStringUserExist: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `
    const queryConfigUserExist: QueryConfig = {
        text: queryStringUserExist,
        values: [req.body.email]
    }

    const queryResultUserExist: QueryResult = await client.query(queryConfigUserExist)

    if(queryResultUserExist.rowCount > 0){
        throw new AppError("E-mail already registered", 409)
    }

    return next()
}

export {
    ensureEmailExistsMiddleware
}