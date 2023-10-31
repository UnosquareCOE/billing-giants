import { prisma } from "../utils/prisma";

const getAll = async () => {

    return await prisma.venues.findMany({});
};

const venuesService = {
    getAll
}

export { venuesService }