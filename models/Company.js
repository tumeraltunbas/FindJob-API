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
});

export const Company = mongoose.model("Company", CompanySchema);