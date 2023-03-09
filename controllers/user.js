import CustomError from "../helpers/error/CustomError.js";
import { Job } from "../models/Job.js";
import {User} from "../models/User.js";

export const updatePersonalInformations = async(req, res, next) => {
    try{
        const {about, website, state, city, isMarried} = req.body;
        
        if(website){
            const websiteCheck = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(website);
            if(!websiteCheck){
                return next(new CustomError(400, "Invalid website format"));
            }
        }

        await User.findByIdAndUpdate(
            {_id:req.user.id}, 
            
            {
            "personalInformations.about":about,
            "personalInformations.website":website,
            "personalInformations.state":state,
            "personalInformations.city":city,
            "personalInformations.isMarried":isMarried
        });

        return res.status(200).json({success:true, message:"Personal Informations has been updated"});
        
    }
    catch(err){
        return next(err);
    }
}

export const updateWorkExperience = async(req, res, next) => {
    try{
        const {workExperienceId} = req.params;
        const {title, companyName, employmentType, location, startedAt, endedAt, description} = req.body;
        
        const user = await User.findOne({_id:req.user.id}).select("_id workExperiences");
        
        for(var experience of user.workExperiences){
            
            if(experience._id == workExperienceId){

                experience.title = title;
                experience.companyName = companyName;
                experience.employmentType = employmentType;
                experience.location = location;
                experience.startedAt = startedAt;
                experience.endedAt = endedAt;
                experience.description = description;
                
                break;
            }
        }
        
        await user.save();

        return res.status(200).json({success:true, message:"Your work experience has been updated"});
    }
    catch(err){
        return next(err);
    }
}

export const getProfile = async(req, res, next) => {
    try{

        const {username} = req.params;
        
        const user = await User.findOne({
            username:username,
            isActive:true
        })
        .select(`
            firstName
            lastName
            username
            email
            dateOfBirth
            gender
            profilePhotoUrl
            personalInformations
            experiences
            educations
            certificates
        `)
        .populate({
            path:"experiences", 
            select:"-user -isVisible -createdAt"
        })
        .populate({
            path:"educations",
            select:"-user -isVisible -createdAt"
        })
        .populate({
            path:"certificates",
            select:"-user -isVisible -createdAt"
        });

        return res.status(200).json({success:true, user:user});

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