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