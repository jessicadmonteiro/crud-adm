import { Router } from "express"
import {
  createUsersController,
  readUserController,
  readProfileController,
  updateUserController,
  deleteUserController,
  updateActiveController
} from "../controllers/users.contollers"
import { ensureValidadData } from "../middlewares/ensureValidadData.middleware"
import { createUserSchema} from "../schemas/users.schemas"
import { ensureTokenValidMiddleware } from "../middlewares/ensureTokenValid.middleware"
import { ensureAdminMiddleware } from "../middlewares/ensureAdmin.middleware"
import {ensureUserExistsMiddleware} from "../middlewares/ensureUserExists.middleware"
import { ensureUserOrAdminMiddleware} from "../middlewares/ensureUserOrAdmin.middleware"
import { ensureEmailExistsMiddleware } from "../middlewares/ensureEmailExists.middleware"

const userRoutes: Router = Router()

userRoutes.post("", ensureValidadData(createUserSchema), ensureEmailExistsMiddleware, createUsersController)
userRoutes.get("", ensureTokenValidMiddleware, ensureAdminMiddleware, readUserController)
userRoutes.get("/profile", ensureTokenValidMiddleware, readProfileController)
userRoutes.patch("/:id", ensureUserExistsMiddleware, ensureTokenValidMiddleware, ensureEmailExistsMiddleware, ensureUserOrAdminMiddleware, updateUserController)
userRoutes.delete("/:id", ensureUserExistsMiddleware, ensureTokenValidMiddleware, ensureUserOrAdminMiddleware, deleteUserController)
userRoutes.put("/:id/recover", ensureUserExistsMiddleware, ensureTokenValidMiddleware, ensureAdminMiddleware, updateActiveController)

export { userRoutes }
