import CustomError from "../../helpers/error/CustomError.js";
import jwt from "jsonwebtoken";
import {User} from "../../models/User.js";
import { Experience } from "../../models/Experience.js";
import { Education } from "../../models/Education.js";
import { Certificate } from "../../models/Certificate.js";

export const getAccessToRoute = (req, res, next) => {
    const {JWT_SECRET_KEY} = process.env;
    const token = req.cookies.access_token;
    if(!token){
        return next(new CustomError(400, "There is no token"));
    }
    jwt.verify(token, JWT_SECRET_KEY, async(err, decoded)=> {
        if(err){
            return next(new CustomError(401, "You can not access this route"));
        }
        req.user = {
            id:decoded.id,
        };

        if(!await User.findOne({_id:req.user.id}).select("_id")) {
            return next(new CustomError(400, "This user is not exists. You can not access this route"));
        }
        next();
    });
}

export const getExperienceOwnerAccess = async(req, res, next) => {
    try{
        const {experienceId} = req.params;
        
        const experience = await Experience.findOne({
            _id:experienceId,
            isVisible:true
        })
        .select("_id user");

        if(experience.user != req.user.id){
            return next(new CustomError(403, "You are not owner of this experience"));
        }

        next();
    }
    catch(err){
        return next(err);
    }
}

export const getEducationOwnerAccess = async(req, res, next) => {
    try{
        const {educationId} = req.params;

        const education = await Education.findOne({
            _id:educationId,
            isVisible:true
        })
        .select("_id user");

        if(education.user != req.user.id){
            return next(new CustomError(403, "You are not owner of this education"));
        }

        next();
    }
    catch(err){
        return next(err);
    }
}

export const getCertificateOwnerAccess = async(req ,res, next) => {
    try{
        const {certificateId} = req.params;
        
        const certificate = await Certificate.findOne({
            _id:certificateId,
            isVisible:true
        })
        .select("_id user");

        if(certificate.user != req.user.id){
            return next(new CustomError(403, "You are not owner of this certificate"));
        }

        next();
    }
    catch(err){
        return next(err);
    }
}