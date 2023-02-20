import { QueryConfig } from "pg"
import { iLoginRequest } from "../../interfaces/login.interfaces"
import { iUserResultPassword} from "../../interfaces/users.interface"
import { client } from "../../databade"
import { AppError } from "../../error"
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"

const createLoginService = async(loginData: iLoginRequest): Promise<string> => {

    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [loginData.email]
    }

    const queryResult: iUserResultPassword = await client.query(queryConfig)

   if(queryResult.rowCount === 0) {
        throw new AppError("Wrong email/password", 401)
   }

   const pwdMatch: boolean = await compare(loginData.password, queryResult.rows[0].password)

   if(!pwdMatch){
    throw new AppError("Wrong email/password", 401)
   }

   const token: string = jwt.sign(
    {
        admin: queryResult.rows[0].admin
    },
    process.env.SECRET_KEY!,
    {
        expiresIn: "24h",
        subject: queryResult.rows[0].id.toString()
    }
   )

   return token
}

export {
    createLoginService
}