import { Request, Response, NextFunction } from "express"
import { QueryConfig, QueryResult } from "pg"
import { client } from "../databade"
import { AppError } from "../error"


const ensureUserExistsMiddleware = async ( req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const userId: number = parseInt(req.params.id)

    const queryStringUser: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1;
    `
    const queryConfigUser: QueryConfig = {
        text: queryStringUser,
        values: [userId]
    }

    const queryResultUser: QueryResult = await client.query(queryConfigUser)

    if(queryResultUser.rowCount === 0) {
        throw new AppError("User not found", 404)
    }

    return next()
}

export {
    ensureUserExistsMiddleware
}