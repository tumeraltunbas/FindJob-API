import { generate } from "randomstring"
import bcrypt from "bcryptjs";

export const createToken = () => {
    const randomString = generate(20);
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(randomString, salt);
    return hash;
}

export const checkPassword = (password) => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if(!passwordRegex.test(password)){
        return false;
    }
    else{
        return true;
    }
}