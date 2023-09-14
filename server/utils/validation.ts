import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const hasError = !errors.isEmpty();

    if (hasError) {
        res.status(400).json({ errors: errors.array() })
    }
    else {
        next();
    }
}

const validation = { validate };
export { validation };