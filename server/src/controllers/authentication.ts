import { Request, Response } from "express";
import { authenticate } from "../services/authentication";

const authenticateAction = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const accessToken = await authenticate({email, password});
    
    if (!accessToken) return res.sendStatus(401);

    res.json({ accessToken }).status(200);
  };

const authenticationController = {
    authenticateAction,
}

export { authenticationController };
