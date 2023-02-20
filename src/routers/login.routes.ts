import { Router } from "express"
import { createLoginControllers } from "../controllers/login.controllers"
import { ensureValidadData } from "../middlewares/ensureValidadData.middleware"
import { createLoginSchema } from "../schemas/login.schemas"

const loginRoutes: Router = Router()

loginRoutes.post("", ensureValidadData(createLoginSchema),createLoginControllers)

export { loginRoutes }
