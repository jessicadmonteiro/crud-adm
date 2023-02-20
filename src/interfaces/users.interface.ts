import { QueryResult } from "pg"
import { createUserSchema, userSchema, userSchemaWithoutPassword, allUserSchema } from "../schemas/users.schemas"
import { z } from "zod"


type iUserRquest = z.infer<typeof createUserSchema> 
type iUser       = z.infer<typeof userSchema>
type iAllUsers   = z.infer<typeof allUserSchema>

type iUserWithoutPassword = Omit<iUser, "password">
type iUserResult          = QueryResult<iUserWithoutPassword>
type iUserResultPassword  = QueryResult<iUser>

export {
    iUserRquest,
    iUser,
    iUserWithoutPassword,
    iUserResult,
    iAllUsers,
    iUserResultPassword
}
   
