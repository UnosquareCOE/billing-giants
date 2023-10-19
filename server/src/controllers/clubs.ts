import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

const getAll = async (req: Request, res: Response) => {
  const clubs = await prisma.clubs.findMany();
  res.json(clubs).status(200);
};

const getSingle = async (req: Request, res: Response) => {
  const { clubId } = req.params;
  const club = await prisma.clubs.findUnique({
    where: {
      id: parseInt(clubId),
    },
  });

  if (club) {
    res.json(club).status(200);
  } else {
    res.sendStatus(204);
  }
};

const deleteSingle = async (req: Request, res: Response) => {
  const { clubId } = req.params;

  const club = await prisma.clubs.findUnique({
    where: {
      id: parseInt(clubId),
    },
  });

  if (club) {
    await prisma.clubs.delete({
      where: {
        id: parseInt(clubId),
      },
    });
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

const create = async (req: Request, res: Response) => {
  const { name } = req.body;

  const club = await prisma.clubs.create({
    data: {
      name
    },
  });

  res.status(201).json(club);
};

const update = async (req: Request, res: Response) => {
  const { clubId } = req.params;
  const { name } = req.body;
  console.log(clubId, name);
  const club = await prisma.clubs.update({
    where: {
      id: parseInt(clubId),
    },
    data: {
      name
    },
  });

  res.status(201).json(club);
};

const clubsController = {
  getAll,
  getSingle,
  deleteSingle,
  create,
  update,
};

export { clubsController };
