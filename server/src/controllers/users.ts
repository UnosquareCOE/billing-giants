import { usersService } from "../services/users";

async function createUser(req, res) {
    const { firstName, secondName, email, password } = req.body;
    const newUser = usersService.create({ firstName, secondName, email, password });

    res.status(201).json(newUser);
  }
  
  const usersController = {
    createUser
  }

export { usersController };
