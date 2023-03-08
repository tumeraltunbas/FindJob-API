import CustomError from "../helpers/error/CustomError.js";
import { Company } from "../models/Company.js";
import { Job } from "../models/Job.js";

export const getJobs = async(req, res, next) => {
    try{
        const jobs = await Job.find()
        .populate({
            path:"Company", 
            select: "name logoUrl"
        });

        return res.status(200).json({success:true, jobs:jobs});
    }
    catch(err){
        return next(err);
    }
}

export const createJob = async(req, res, next) => {
    try{
        const {title, jobDescription, qualifications,  employmentType, location} = req.body;

        const company = await Company.findOne({
            user:req.user.id
        }).select("_id");

        if(employmentType != "Remote" && !location){
            return next(new CustomError(400, "Location can not be null"));
        }

        await Job.create({
            title:title,
            jobDescription:jobDescription,
            qualifications:qualifications,
            employmentType:employmentType,
            location:location,
            company:company.id
        });

        return res
        .status(200)
        .json({success:true, message:"Job has been published"});
    }
    catch(err){
        return next(err);
    }
}