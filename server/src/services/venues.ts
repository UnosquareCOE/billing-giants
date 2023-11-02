import { prisma } from "../utils/prisma";

const getAll = async () => {

    return await prisma.venues.findMany({});
};

const getSingle = async (venueId: number) => {
    return await prisma.venues.findUnique({
        where: {
            id: venueId,
        },
    });

}

const create = async (name: string) => {
    return await prisma.venues.create({
        data: {
            name
        },
    });
}

const venuesService = {
    getAll,
    getSingle,
    create
}

export { venuesService }