import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import errorHandler from "./src/middlewares/errorHandlerMiddleware.js";
import battleRouter from "./src/routers/battleRouter.js";
import "express-async-errors";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(battleRouter);
app.use(errorHandler);

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})