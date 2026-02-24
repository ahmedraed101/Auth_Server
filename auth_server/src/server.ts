import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRoutes from "./routes/auth.route.ts";
import { ErrorHandler } from "./middleware/index.ts";

dotenv.config();
const PORT = Number(process.env.PORT) || 3000;

const app = express()

// middlewares
app.use(express.json());
app.use(cookieParser());

// health route
app.get("/", (req, res) => {
    res.send('Hello from the other side.');
})

// POST /auth/register
app.use("/auth", AuthRoutes);

app.use(ErrorHandler)

app.listen(PORT, () => {
    console.log(`server is live on http://localhost:${PORT}`);
})