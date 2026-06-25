import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js"
import orderRouter from "./routes/order.routes.js"
import cartRouter from "./routes/cart.routes.js"
import reviewRouter from "./routes/review.routes.js"
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFound } from "./middleware/notFoundMiddleware.js";
import  swaggerUi  from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerPath = path.join(__dirname, "docs", "swagger.yaml");
const swaggerDocument = YAML.load(swaggerPath);

app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {}, { explorer: true })
);

app.use("/auth", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);
app.use("/cart", cartRouter);
app.use(reviewRouter);

app.use(notFound)
app.use(errorMiddleware);

export default app;