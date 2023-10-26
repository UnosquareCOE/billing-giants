import { prisma } from "../utils/prisma";

const getAll = async (startDate: Date | undefined = undefined) => {
  const config: any = {};
  if (startDate) {
    config.where = {
      start_date: startDate,
    };
  }

  return await prisma.seasons.findMany(config);
};

const seasonService = {
    getAll
}

export { seasonService }