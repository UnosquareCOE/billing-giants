import { usersService } from "./users"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function authenticate({ email, password } : { email: string, password: string }) {
    const user = await usersService.getByEmail(email);
    if (user) {
        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (passwordCorrect) {
            return jwt.sign({ sub: user.id }, "MySecret", { expiresIn: 1200 });
        }
    }
}

export {
    authenticate,
}