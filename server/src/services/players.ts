import { prisma } from "../utils/prisma";

const getAll = async () => {

    return await prisma.players.findMany({});
};

const getSingle = async (playerId: number) => {
    return await prisma.players.findUnique({
        where: {
            id: playerId,
        },
    });

}

const create = async (name: string) => {
    return await prisma.players.create({
        data: {
            name
        },
    });
}

const update = async (id: number, name: string) => {
    return await prisma.players.update({
        where: {
            id,
        },
        data: {
            name,
        },
    });
}

const deleteSingle = async (id: number) => {
    await prisma.players.delete({
        where: {
            id,
        },
    });
}

const playersService = {
    getAll,
    getSingle,
    create,
    update,
    deleteSingle
}

export { playersService }