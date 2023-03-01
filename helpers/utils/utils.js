import { generate } from "randomstring"
import bcrypt from "bcryptjs";

export const createToken = () => {
    const randomString = generate(20);
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(randomString, salt);
    return hash;
}