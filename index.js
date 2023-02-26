import express from "express";
import { config } from "dotenv";
import { connectDb } from "./helpers/database/dbConnection.js";


config({path:"./config/config.env"});
const app = express();

connectDb();



app.listen(process.env.PORT, () => console.log(`Server started at ${process.env.PORT}`));