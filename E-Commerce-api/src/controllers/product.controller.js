import ProductService from "../services/product.service.js";

export default class ProductController {
    static async getAll(req, res) {
        const products = await ProductService.getAll();

        return res.status(200).json({
            success: true,
            products
        });
    }

    static async getById(req, res) {
        const product = await ProductService.getById(req.params.id);

        return res.status(200).json({
            success: true,
            product
        });
    }

    static async create(req, res) {
        const product = await ProductService.create(req.body);

        return res.status(201).json({
            success: true,
            product
        });
    }

    static async update(req, res) {
        const product = await ProductService.update(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            product
        });
    }

    static async remove(req, res) {
        await ProductService.remove(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Deleted"
        });
    }
}