import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

const getAll = async (req: Request, res: Response) => {
  const { startDate } = req.query;
  const config: any = {};
  if (startDate) {
    config.where = {
      start_date: new Date(startDate as string),
    };
  } 

  const seasons = await prisma.seasons.findMany(config);
  res.json(seasons).status(200);
};

const getSingle = async (req: Request, res: Response) => {
  const { seasonId } = req.params;
  const season = await prisma.seasons.findUnique({
    where: {
      id: parseInt(seasonId),
    },
  });

  if (season) {
    res.json(season).status(200);
  } else {
    res.sendStatus(404);
  }
};

const deleteSingle = async (req: Request, res: Response) => {
  const { seasonId } = req.params;

  const season = await prisma.seasons.findUnique({
    where: {
      id: parseInt(seasonId),
    },
  });

  if (season) {
    await prisma.seasons.delete({
      where: {
        id: parseInt(seasonId),
      },
    });
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

const create = async (req: Request, res: Response) => {
  const { startDate, endDate, sportTypeId } = req.body;

  const season = await prisma.seasons.create({
    data: {
      start_date: startDate,
      end_date: endDate,
      sport_type_id: sportTypeId,
    },
  });

  res.status(201).json(season);
};

const update = async (req: Request, res: Response) => {
  const { seasonId } = req.params;
  const { startDate, endDate, sportTypeId } = req.body;

  const season = await prisma.seasons.update({
    where: {
      id: parseInt(seasonId),
    },
    data: {
      start_date: startDate,
      end_date: endDate,
      sport_type_id: sportTypeId,
    },
  });

  res.status(201).json(season);
};

const seasonsController = {
  getAll,
  getSingle,
  deleteSingle,
  create,
  update,
};

export { seasonsController };
