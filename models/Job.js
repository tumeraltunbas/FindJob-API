import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true, "Job title can not be null"]
    },
    jobDescription: {
        type:String,
        required:[true, "Job description can not be null"]
    },
    qualifications: {
        type:String,
        required:[true, "Qualifications can not be null"]
    },
    employmentType: {
        type:String,
        required:[true, "Employment type can not be null"],
        enum: ["Full-Time", "Part-Time", "Internship", "Remote"],
    },
    location: {
        type:String,
        default:null
    },  
    appliedUsers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    company: {
        type: mongoose.Schema.ObjectId,
        required:[true, "Created by can not null"],
        ref: "Company"
    },
    isVisible: {
        type: Boolean,
        default:true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export const Job = mongoose.model("Job", JobSchema);