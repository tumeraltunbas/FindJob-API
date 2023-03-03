import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({
    name: {
        type:String,
        required:[true, "Company name can not be null"]
    },
    slogan: {
        type:String,
        default:null
    },
    about: {
        type:String,
        default:null
    },
    sector: {
        type:String,
        required:[true, "Sector can not be null"],
        enum: ["Technology", "Software", "Education", "Marketing", "Science", "Manufacturing"]
    },
    location: {
        type:String,
        required:[true, "Location can not be null"]
    },
    logoUrl: {
        type:String,
        default:"logo.png",
    },
    website: {
        type:String,
        default:null,   
    },
    slug:{
        type:String,
        required:[true, "Slug can not be null"]
    },
    user: {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:[true, "User can not be null"]
    },
    isVisible: {
        type:Boolean,
        default:true
    },
    createdAt: {
        type:Date,
        default: Date.now()
    },
});

export const Company = mongoose.model("Company", CompanySchema);