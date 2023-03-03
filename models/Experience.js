import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true, "Title can not be null"],
    },
    companyName: {
        type:String,
        required:[true, "Company Name can not be null"]
    },
    employmentType: {
        type:String,
        required:[true, "Employment type can not be null"],
        enum: ["Full-Time", "Part-Time", "Internship", "My-Job"],
    },
    location: {
        type:String,
        required:[true, "Location can not be null"],
    },
    startedAt: {
        type:Date,
        required:[true, "Started At can not be null"]
    },
    endedAt:{
        type:Date,
        default:null
    },
    description: {
        type:String,
        default:null
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

export const Experience = mongoose.model("Experience", ExperienceSchema);