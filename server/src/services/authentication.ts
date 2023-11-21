import { usersService } from "./users"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function authenticate({ email, password } : { email: string, password: string }) {
    const users = await usersService.getByEmail(email);
    if (users && users.length == 1) {
        const passwordCorrect = await bcrypt.compare(password, users[0].password);
        if (passwordCorrect) {
            return jwt.sign({ sub: users[0].id }, "MySecret", { expiresIn: 1200 });
        }
    }
}

export {
    authenticate,
}