import {Education} from "../models/Education.js";

export const createEducation = async(req, res, next) => {
    try{
        const {schoolName, degree, major, gpa, startedAt, endedAt} = req.body;

        await Education.create({
            schoolName:schoolName,
            degree:degree,
            major:major,
            gpa:Number(gpa),
            startedAt:startedAt,
            endedAt:endedAt,
            user:req.user.id
        });

        return res.status(200).json({success:true, message:"Education has been created"});
    }
    catch(err){
        return next(err);
    }
}


export const deleteEducation = async(req, res, next) => {
    try{
        const {educationId} = req.params;

        await Education.findByIdAndUpdate(
            {_id:educationId},

            {
                isVisible:false
            }
        );

        return res.status(200).json({success:true, message:"Education has been deleted"});
    }
    catch(err){
        return next(err);
    }
}

export const updateEducation = async(req, res, next) => {
    try{
        const {educationId} = req.params;
        const informations = req.body;

        await Education.findByIdAndUpdate(
            {_id:educationId},
            {
                ...informations
            }
        );

        return res.status(200).json({success:true, message:"Education has been updated"});
    }
    catch(err){
        return next(err);
    }
}