import { playersService } from "../services/players";
import { Request, Response } from "express";


const getAll = async (req: Request, res: Response) => {
    const players = await playersService.getAll();

    res.json(players).status(200);
}

const getSingle = async (req: Request, res: Response) => {
    const { playerId } = req.params;

    const player = await playersService.getSingle(parseInt(playerId));

    if (player) {
        res.json(player).status(200);
    } else {
        res.sendStatus(404);
    }
};

const create = async (req: Request, res: Response) => {
    const { name } = req.body;

    const player = await playersService.create(name);

    res.status(201).json(player);
};

const update = async (req: Request, res: Response) => {
    const { playerId } = req.params;
    const { name } = req.body;

    await playersService.update(parseInt(playerId), name);

    res.sendStatus(204);
};

const deleteSingle = async (req: Request, res: Response) => {
    const { playerId } = req.params;

    const player = await playersService.getSingle(parseInt(playerId));

    if (player) {
        await playersService.deleteSingle(parseInt(playerId))
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
};

const playersController = {
    getAll,
    getSingle,
    create,
    update,
    deleteSingle
};

export { playersController };
