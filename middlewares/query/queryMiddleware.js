import CustomError from "../../helpers/error/CustomError.js";
import { User } from "../../models/User.js";

export const isUserExist = async(req, res, next) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email:email}).select("_id");
        if(!user){
            return next(new CustomError(400, "There is no user with that email"));
        }
        next();
    }
    catch(err){
        return next(err);
    }
}

export const isWorkExperienceExists = async(req, res, next) => {
    try{
        const {workExperienceId} = req.params;

        const workExperience = await User.findOne(
            {_id:req.user.id, 
                workExperiences: 
                {
                    $elemMatch: {_id:workExperienceId}
                } 
            }
        )
        .select("_id workExperiences");
        
        if(!workExperience){
            return next(new CustomError(400, "There is no work experience with that id"));
        }

        next();
    }
    catch(err){
        return next(err);
    }
}