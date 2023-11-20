import { prisma } from "../utils/prisma";

const create = ({ firstName, secondName, email, password }) => {
  prisma.users.create({
    data: {
        first_name: firstName,
        second_name: secondName,
        email: email,
        password: password,
    }
  });
};

const usersService = {
  create,
};

export { usersService };
