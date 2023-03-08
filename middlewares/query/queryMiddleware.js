import CustomError from "../../helpers/error/CustomError.js";
import { Certificate } from "../../models/Certificate.js";
import { Education } from "../../models/Education.js";
import { Experience } from "../../models/Experience.js";
import { Job } from "../../models/Job.js";
import { User } from "../../models/User.js";

export const isUserExist = async(req, res, next) => {
    try{
        const {email} = req.body;

        const user = await User.findOne({
            email:email
        })
        .select("_id");
        
        if(!user){
            return next(new CustomError(400, "There is no user with that email"));
        }
        
        next();
    }
    catch(err){
        return next(err);
    }
}

export const isExperienceExists = async(req, res, next) => {
    try{
        const {experienceId} = req.params;

        const experience = await Experience.findOne({
            _id:experienceId,
            isVisible:true
        })
        .select("_id")

        if(!experience){
            return next(new CustomError(400, "There is no work experience with that id"));
        }

        next();
    }
    catch(err){
        return next(err);
    }
}

export const isEducationExists = async(req, res, next) => {
    try{
        const {educationId} = req.params;

        const education = await Education.findOne({
            _id:educationId,
            isVisible:true
        }).select("_id");

        if(!education){
            return next(new CustomError(400, "There is no education with that id"));
        }

        next();
    }
    catch(err){
        return next(err);
    }
}

export const isCertificateExist = async(req, res, next) => {
    try{
        const {certificateId} = req.params;
        
        const certificate = await Certificate.findOne({
            _id:certificateId,
            isVisible:true
        }).select("_id");

        if(!certificate) {
            return next(new CustomError(400, "There is no certificate with that id"));
        }

        next();
    }
    catch(err){
        return next(err);
    }
}

export const isJobExists = async(req, res, next) => {
    try{
        const {jobId} = req.params;

        const job = await Job.findOne({
            _id:jobId,
            isVisible:true
        }).select("_id");

        if(!job){
            return next(new CustomError(400, "There is no job with that id"));
        }

        next();
    }
    catch(err){
        return next(err);
    }
}