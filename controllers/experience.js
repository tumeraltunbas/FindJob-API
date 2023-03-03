import { Experience } from "../models/Experience.js";

export const createExperience = async(req, res, next) => {
    try{
        const {title, companyName, employmentType, location, startedAt, endedAt, description} = req.body;

        await Experience.create({
            title:title,
            companyName:companyName,
            employmentType:employmentType,
            location:location,
            startedAt:startedAt,
            endedAt:endedAt,
            description:description,
            user: req.user.id         
        });

        return res.status(200).json({success:true, message:"Experience has been added"});

    }   
    catch(err){
        return next(err);
    }
}

export const deleteExperience = async(req, res, next) => {
    try{
        const {experienceId} = req.params;
        
        await Experience.findByIdAndUpdate(
            {_id:experienceId},

            {
                isVisible:false
            }
        );

        return res.status(200).json({success:true, message:"Experience has been deleted"});
    }
    catch(err){
        return next(err);
    }
}

export const updateExperience = async(req, res, next) => {
    try{
        const {experienceId} = req.params;

        const informations = req.body;
         
        await Experience.findByIdAndUpdate(
            {_id:experienceId},
            
            {
                ...informations
            }
        );

        return res.status(200).json({success:true, message:"Experience has been updated"});
    }
    catch(err){
        return next(err);
    }
}