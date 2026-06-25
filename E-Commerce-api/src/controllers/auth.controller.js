import  AuthService  from "../services/auth.service.js";

export default class AuthController {
    static async register(req, res) {
        const user = await AuthService.register(req.body);

        res.status(201).json({
            success: true,
            user
        });
    }

    static async login(req, res) {
        const result = await AuthService.login(req.body);

        res.status(200).json({
            success: true,
            ...result
        });
    }

    static async me(req, res) {
        const user = await AuthService.me(req.params.id);

        res.status(200).json({
            success: true,
            user
        });
    }
}