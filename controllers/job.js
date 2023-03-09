import CustomError from "../helpers/error/CustomError.js";
import { Company } from "../models/Company.js";
import { Job } from "../models/Job.js";

export const getJobs = async(req, res, next) => {
    try{
        const jobs = await Job.find()
        .populate({
            path:"Company", 
            select: "name logoUrl"
        })
        .select("_id title employmentType location createdAt");

        return res.status(200).json({success:true, jobs:jobs});
    }
    catch(err){
        return next(err);
    }
}

export const getJob = async(req, res, next) => {
    try{
        const {jobId} = req.params;

        const job = await Job.findOne({
            _id:jobId,
        })
        .select(`
            _id
            title 
            jobDescription
            qualifications
            employmentType
            location
            company
            createdAt
        `)
        .populate({
            path:"company",
            select:"name logoUrl"
        });

        return res.status(200).json({success:true, job:job});
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

export const applyJob = async(req, res, next) => {
    try{
        const {jobId} = req.params;

        const job = await Job.findOne({
            _id:jobId,
            isVisible:true,
        }).select("_id appliedUsers appliedUserCount");

        if(job.appliedUsers.includes(req.user.id)){
            return next(new CustomError(400, "You have already applied this job"));
        }

        job.appliedUsers.push(req.user.id);
        job.appliedUserCount += 1;
        await job.save();

        return res
        .status(200)
        .json({success:true, message:"You have successfully applied this job"});

    }
    catch(err){
        return next(err);
    }
}

export const unApplyJob = async(req, res, next) => {
    try{
        const {jobId} = req.params

        const job = await Job.findOne({
            _id:jobId,
            isVisible:true
        })
        .select("_id appliedUsers appliedUserCount");

        if(!job.appliedUsers.includes(req.user.id)){
            return next(new CustomError(400, "You have not already applied this job"));
        }

        job.appliedUsers.splice(req.user.id, 1);
        job.appliedUserCount -= 1;
        await job.save();

        return res
        .status(200)
        .json({success:true, message:"You have successfully unapplied this job"});

    }
    catch(err){
        return next(err);
    }
}

export const getAppliedUsers = async(req, res, next) => {
    try{
        const {jobId} = req.params;

        const job = await Job.findOne({ 
            _id:jobId,
            isVisible:true
        })
        .select("_id appliedUsers appliedUserCount")
        .populate({path:"appliedUsers", select:"firstName lastName email dateOfBirth gender"});

        return res.status(200).json({success:true, job:job});
        
    }
    catch(err){
        return next(err);
    }
}