import CustomError from "../helpers/error/CustomError.js";
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

        await User.findByIdAndUpdate({_id:req.user.id}, {
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