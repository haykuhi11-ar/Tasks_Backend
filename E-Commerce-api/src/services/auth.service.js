import db from "../../models/index.js";
import  AppError  from "../utils/AppError.js";
import { comparePassword } from "../utils/hashPassword.js";
import { createToken, verifyToken } from "../utils/token.js";

const secretKey = process.env.JWT_SECRET;
const { Users, Carts } = db

export default class AuthService {
    static async register({ name, email, password, role }) {
        const existingUser = await Users.findOne({
            where: { email }
        });

        if (existingUser) {
            throw AppError.conflict("User already exists");
        }

        const newUser = await Users.create({
            name,
            email,
            password,
            role
        });

        await Carts.create({
            user_id: newUser.id
        });

        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        };
    }

    static async login({ email, password }) {
        const user = await Users.findOne({
            where: { email }
        });

        if (!user) {
            throw AppError.unauthorized("Invalid credentials");
        }

        const isValidPassword = await comparePassword(password, user.password);

        if (!isValidPassword) {
            throw AppError.unauthorized("Invalid credentials");
        }

        const payload = {
            id: user.id,
            role: user.role
        };

        const token = createToken({ secretKey, payload });

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }

    static async me(userId) {
        const user = await Users.findByPk(userId, {
            attributes: {
                exclude: ["password"]
            }
        });

        if (!user) {
            throw AppError.notFound("User not found");
        }

        return user;
    }
}