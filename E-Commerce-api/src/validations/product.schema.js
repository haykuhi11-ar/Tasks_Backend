import { z } from "zod";

export const ProductSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must contain at least 2 characters")
        .max(100, "Name cannot exceed 100 characters"),

    description: z
        .string()
        .trim()
        .max(1000, "Description cannot exceed 1000 characters")
        .optional(),

    price: z
        .number()
        .positive("Price cannot be negative"),

    stock: z.number()
        .int("Stock must be an integer")
        .min(0, "Stock cannot be negative"),

    imageUrl: z
        .url("Invalid image URL")
        .optional()
});