import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(2, "Name must contain at least 2 characters"),

    email: z
        .email("Invalid email"),

    password: z
        .string()
        .min(8, "Password must contain at least 8 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
            "Password must contain uppercase, lowercase, number and special character"
        )
});