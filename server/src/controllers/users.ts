import { usersService } from "../services/users";
import { Request, Response } from "express";

async function getUsers(req : Request, res: Response) {
  const users =  await usersService.getAll();
  if (users && users.length > 0) {
    return res.status(200).json(users);
  }
  return res.sendStatus(204);
}

async function getUserById(req : Request, res: Response) {
  const { userId } = req.params;
  const user =  await usersService.getById(parseInt(userId));
  if (user) {
    return res.status(200).json(user);
  }
  return res.sendStatus(404);
}

async function createUser(req : Request, res: Response) {
    const { firstName, secondName, email, password } = req.body;
    const newUser = await usersService.create({ firstName, secondName, email, password });
    res.status(201).json(newUser);
}

async function updateUser(req : Request, res: Response) {
  const { userId } = req.params;
  const { firstName, secondName, email, password } = req.body;
  await usersService.update({ id: parseInt(userId), firstName, secondName, email, password });
  return res.status(204);
}
  
const usersController = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
}

export { usersController };
