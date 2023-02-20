import { Request, Response, NextFunction } from "express"
import { ZodTypeAny } from "zod"

const ensureValidadData = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {

    const ValidatedData = schema.parse(req.body)

    req.body = ValidatedData

    return next()
}

export {
    ensureValidadData
}