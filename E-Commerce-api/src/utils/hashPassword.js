import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    const hashedPass = await bcrypt.hash(password, 10);

    return hashedPass;
}

export const comparePassword = async (password, userPassword) => {
    const compare = await bcrypt.compare(password, userPassword);

    return compare;
}
