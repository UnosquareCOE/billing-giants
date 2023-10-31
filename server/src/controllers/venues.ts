import { venuesService } from "../services/venues";
import { Request, Response } from "express";


const getAll = async (req: Request, res: Response) => {
    const venues = await venuesService.getAll();

    res.json(venues).status(200);
}

const venuesController = {
    getAll
};

export { venuesController };
