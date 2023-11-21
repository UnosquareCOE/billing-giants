import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";

const getAll = () =>  {
  return prisma.users.findMany({}); 
}

const getById = (id: number) =>  {
  return prisma.users.findUnique({
    where: {
      id,
    }
  }); 
}

const getByEmail = (email: string) =>  {
  return prisma.users.findMany({
    where: {
      email,
    }
  }); 
}

const create = async ({ firstName, secondName, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.users.create({
    data: {
        first_name: firstName,
        second_name: secondName,
        email: email,
        password: hashedPassword,
    }
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
    }
  });
};


const usersService = {
  getAll,
  getById,
  getByEmail,
  create,
  update
};

export { usersService };
