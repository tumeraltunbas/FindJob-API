import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
    schoolName: {
        type:String,
        required:[true, "School Name can not be null"]
    },
    degree: {
        type:String,
        required:[true, "Degree can not be null"],
        enum:["Bachelor's Degree", "Associate Degree", "Master's Degree", "Doctoral Degree", "Highschool Degree"]
    },
    major: {
        type:String,
        required:[true, "Major can not be null"]
    },
    gpa: {
        type: Number,
        default:null
    },
    startedAt: {
        type:Date,
        required:[true, "Started At can not be null"]
    },
    endedAt:{
        type:Date,
        required:[true, "Ended At can not be null"]
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

export const Education = mongoose.model("Education", EducationSchema);