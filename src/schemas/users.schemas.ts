import { hashSync } from "bcryptjs"
import { z } from "zod"

const createUserSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email().max(100),
    password: z.string().max(120).transform((valuePassword) =>{
        return hashSync(valuePassword, 10)
    }),
    admin: z.boolean().optional(),
})

const userSchema = createUserSchema.extend({
    id: z.number(),
    active: z.boolean(),
})


const userSchemaWithoutPassword = userSchema.omit({password: true})

const allUserSchema = z.array(userSchema)

export {
    createUserSchema,
    userSchema,
    userSchemaWithoutPassword,
    allUserSchema,
}