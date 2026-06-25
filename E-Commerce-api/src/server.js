import dotenv from "dotenv";
import app from "./app.js";
import db from "../models/index.js";

dotenv.config();

const PORT = process.env.PORT;

async function startServer() {
    try {
        await db.sequelize.authenticate();
        console.log("Database connected");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error);
    }
}

startServer();

