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

const update = async (id: number, name: string) => {
    return await prisma.venues.update({
        where: {
            id,
        },
        data: {
            name,
        },
    });
}

const deleteSingle = async (id: number) => {
    await prisma.venues.delete({
        where: {
            id,
        },
    });
}

const venuesService = {
    getAll,
    getSingle,
    create,
    update,
    deleteSingle
}

export { venuesService }