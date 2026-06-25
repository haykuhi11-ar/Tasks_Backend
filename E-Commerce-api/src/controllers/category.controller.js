import CategoryService from "../services/category.service.js";

export default class CategoryController {
    static async getAll(req, res) {
        const categories = await CategoryService.getAll();

        return res.status(200).json({
            success: true,
            categories
        });
    }

    static async create(req, res) {
        const category = await CategoryController.create(req.body);

        return res.status(201).json({
            success: true,
            category
        });
    }

    static async remove(req, res) {
        await CategoryController.remove(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Category deleted"
        });
    }
}