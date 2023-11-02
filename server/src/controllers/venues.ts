import { venuesService } from "../services/venues";
import { Request, Response } from "express";


const getAll = async (req: Request, res: Response) => {
    const venues = await venuesService.getAll();

    res.json(venues).status(200);
}

const getSingle = async (req: Request, res: Response) => {
    const { venueId } = req.params;

    const venue = await venuesService.getSingle(parseInt(venueId));

    if (venue) {
        res.json(venue).status(200);
    } else {
        res.sendStatus(404);
    }
};

const create = async (req: Request, res: Response) => {
    const { name } = req.body;

    const venue = await venuesService.create(name);

    res.status(201).json(venue);
};

const venuesController = {
    getAll,
    getSingle,
    create
};

export { venuesController };
