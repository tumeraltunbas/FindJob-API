import mongoose from "mongoose";

export const connectDb = async() => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Database connection successfull")).catch(err=>console.log(err));
}