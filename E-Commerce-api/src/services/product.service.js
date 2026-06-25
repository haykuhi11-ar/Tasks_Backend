import  db from "../../models/index.js";
import AppError from "../utils/AppError.js";

const { Products, Category } = db;

export default class ProductService {
    static async getAll() {
        const products = await Products.findAll({
            include: Category
        });
        
        return products;
    }

    static async getById(id) {
        const product = await Products.findByPk(id, {
            include: Category
        });

        if (!product) {
            throw AppError.notFound("Product not found");
        }

        return product;
    }

    static async create(data) {
        return Products.create(data);
    }

    static async update(id, data) {
        const product = await this.getById(id);
        return product.update(data);
    }

    static async remove(id) {
        const product = await this.getById(id);
        return await product.destroy();
    }
}