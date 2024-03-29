import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";

const getAll = (active: boolean = true) => {
  return prisma.users.findMany({ where: { active } });
};

const getById = (id: number) => {
  return prisma.users.findUnique({
    where: {
      id,
    },
  });
};

const getByEmail = async (email: string) => {
  const users = await prisma.users.findMany({
    where: {
      email,
    },
  });

  return users.length === 1 && users[0];
};

const create = async ({ firstName, secondName, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.users.create({
    data: {
      first_name: firstName,
      second_name: secondName,
      email: email,
      password: hashedPassword,
    },
  });
};

const update = async ({ id, firstName, secondName, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.users.update({
    where: {
      id,
    },
    data: {
      first_name: firstName,
      second_name: secondName,
      email: email,
      password: hashedPassword,
    },
  });
};

const deleteSingle = async (id: number) => {
  const user = await getById(id);
  if (user?.active) {
    await prisma.users.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
  }
};

const usersService = {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  deleteSingle,
};

export { usersService };
