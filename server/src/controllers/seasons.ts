import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAll = async (req: Request, res: Response) => {
  const sportTypes = await prisma.billing_types.findMany({});

  res.json(sportTypes).status(200);
};

const seasonsController = {
  getAll,
};

export { seasonsController };
