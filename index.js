import express from "express";
import { config } from "dotenv";
import { connectDb } from "./helpers/database/dbConnection.js";
import { errorHandler } from "./middlewares/error/errorHandler.js";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config({path:"./config/config.env"});
const app = express();

connectDb();
app.use(cookieParser());
app.use(express.json());
app.use(cors({origin:true, credentials:true}));
app.use("/api",routes);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server started at ${process.env.PORT}`));