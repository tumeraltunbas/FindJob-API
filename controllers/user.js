import CustomError from "../helpers/error/CustomError.js";
import { fileUploadHelper } from "../helpers/fileUpload/fileUpload.js";
import { Job } from "../models/Job.js";
import {User} from "../models/User.js";

export const chooseInterests = async(req, res, next) => {
    try{
        const {interests} = req.body;
        
        await User.findOneAndUpdate(
            {_id:req.user.id},
            {
                interests: interests
            }
        );

        return res.status(200).json({success:true});
    }
    catch(err){
        return next(err);
    }
}

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

export const getAppliedJobs = async(req, res, next) => {
    try{
        const jobs = await Job.find({
            appliedUsers:req.user.id
        })
        .select(`-jobDescription -qualifications -appliedUsers -appliedUserCount -createdAt`)
        .populate({path:"company", select:"name logoUrl"})

        return res.status(200).json({success:true, data:jobs});
    }
    catch(err){
        return next(err);
    }
}

export const uploadPhoto = async(req, res, next) => {
    try{
        const fileName = fileUploadHelper(req, next);
        
        await User.findOneAndUpdate(
            {_id:req.user.id},
            {
                profilePhotoUrl:fileName
            }
        );

        return res.status(200).json({success:true, message:"Your profile photo has been uploaded"});
    }
    catch(err){
        return next(err);
    }
}