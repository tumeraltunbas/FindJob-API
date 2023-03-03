import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Title can not be null"]
    },
    institution: {
        type: String,
        required:[true, "Institution can not be null"],
    },
    date: {
        type: Date,
        required:[true, "Date can not be null"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required:[true, "User can not be null"],
        ref:"User"
    },
    isVisible:{
        type:Boolean,
        default:true
    },
    createdAt: {
        type:Date,
        default:Date.now()
    }
});