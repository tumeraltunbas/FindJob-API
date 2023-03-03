import CustomError from "../../helpers/error/CustomError.js";
import { Education } from "../../models/Education.js";
import { Experience } from "../../models/Experience.js";
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
        });

        if(!education){
            return next(new CustomError(400, "There is no education with that id"));
        }

        next();
    }
    catch(err){
        return next(err);
    }
}