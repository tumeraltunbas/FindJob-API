import CustomError from "../../helpers/error/CustomError.js";
import jwt from "jsonwebtoken";
import {User} from "../../models/User.js";

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
        console.log(decoded);
        req.user = {
            id:decoded.id,
        };

        if(!await User.findOne({_id:req.user.id}).select("_id")) {
            return next(new CustomError(400, "This user is not exists. You can not access this route"));
        }
        next();
    });
}