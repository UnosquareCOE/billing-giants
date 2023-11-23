import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    if (req.path === "/users" && req.method === "POST") return next(); 

    const splitAuth = req.headers.authorization?.split(" ");
    const token = splitAuth && splitAuth.length === 2 && splitAuth[1];

    if (token) {
        try {
            const tokenVerified = jwt.verify(token, "MySecret");
            if (tokenVerified) {
                res.locals.userId = tokenVerified.sub;
                return next();
            }
        }
        catch {
            console.log("Invalid or expired token received");
        }
    }

    return res.sendStatus(401);
}

export { verifyAccessToken };