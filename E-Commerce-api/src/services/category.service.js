import { where } from "sequelize";
import db from "../../models/index.js"
import AppError from "../utils/AppError.js";

const { Category } = db;

export default class CategoryService {
    static async getAll() {
        return Category.findAll();
    }

    static async create({ name }) {
        const existingCategory = await Category.findOne({
            where: { name }
        });

        if (existingCategory) {
            throw AppError.conflict("Category already exists");
        }

        return Category.create({ name });
    }

    static async remove(id) {
        const category = await Category.findByPk(id);

        if (!category) {
            throw AppError.notFound("Category not found");
        }

        return category.destroy();
    }
}