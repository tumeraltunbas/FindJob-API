import CustomError from "../helpers/error/CustomError.js";
import { mailHelper } from "../helpers/mail/mailHelper.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { checkPassword } from "../helpers/utils/utils.js";

export const register = async(req, res, next) => {
    try{
        const {firstName, lastName, email, password, gender, dateOfBirth, role} = req.body;
        const {COOKIE_EXPIRES, NODE_ENV, DOMAIN, SMTP_USER} = process.env;

        if(role != "employee" && role != "employer"){ //avoid potential exploit
            return next(new CustomError(400, "Invalid role"));
        }

        if(!checkPassword(password)){
            return next(new CustomError(400, "Password must contain: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."));
        }

        const user = await User.create({
            firstName:firstName, 
            lastName:lastName, 
            email:email, 
            password:password, 
            gender:gender, 
            dateOfBirth:dateOfBirth,
            role:role
        });

        const jwtToken = user.createJwt();
        const emailVerificationToken = user.createEmailVerificationToken();
        await user.save();

        const emailVerificationLink = `${DOMAIN}/api/auth/email-verification?emailVerificationToken=${emailVerificationToken}`;
       
        mailHelper({
            from:SMTP_USER, 
            to:user.email, 
            subject:"Email Verification", 
            html:`<p> You email verification <a href='${emailVerificationLink}'>link</a> </p>`
        });

        return res
            .cookie("access_token", jwtToken, {maxAge: Number(COOKIE_EXPIRES), httpOnly: NODE_ENV === "development" ? true : false})
            .status(200)
            .json({success:true, message:`Your email confirmation link sent to ${user.email}`});
        
    }
    catch(err){
        return next(err);
    }
}

export const emailVerification = async(req, res, next) => {
    try{
        const {emailVerificationToken} = req.query;
        const user = await User.findOne({emailVerificationToken:emailVerificationToken, emailVerificationTokenExpires: {$gt: Date.now()}});
        
        if(!user){
            return next(new CustomError(400, "Your email verification token wrong or expired"));
        }

        await user.updateOne({
            emailVerificationToken:null, 
            emailVerificationTokenExpires:null, 
            isEmailVerified:true, 
            emailVerifiedAt:Date.now()
        });

        return res.status(200).json({success:true, message:"Your email has been verified"});
    }
    catch(err){
        return next(err);
    }
}

export const login = async(req, res, next) => {
    try{
        const {email, password} = req.body;
        const {COOKIE_EXPIRES, NODE_ENV} = process.env;
        
        if(!email && !password){
            return next(new CustomError(400, "You have to provide credentials"));
        }

        const user = await User.findOne({email:email}).select("_id password isEmailVerified");
        if(user.isEmailVerified != true){
            return next(new CustomError(400, "You must confirm your email before you can continue"));
        }

        if(!bcrypt.compareSync(password, user.password)){
            return next(new CustomError(400, "Check your credentials"));
        }

        const jwtToken = user.createJwt();
        return res
            .cookie("access_token", jwtToken, {maxAge: Number(COOKIE_EXPIRES), httpOnly: NODE_ENV === "development" ? true : false})
            .status(200)
            .json({success:true});
    }
    catch(err){
        return next(err);
    }
}

export const logout = (req, res, next )=> {
    try{
        return res
        .cookie("access_token", null, {maxAge: Date.now()})
        .status(200)
        .json({success:true});
    }
    catch(err){
        return next(err);
    }
}

export const forgotPassword = async(req, res, next) => {
    try{
        const {email} = req.body;
        const {DOMAIN, SMTP_USER} = process.env;

        const user = await User.findOne({
            email:email
        })
        .select("_id email resetPasswordToken resetPasswordTokenExpires");
        
        const token = user.createResetPasswordToken();
        await user.save();
        
        const resetPasswordLink = `${DOMAIN}/api/auth/reset-password?resetPasswordToken=${token}`;
        
        mailHelper({
            from:SMTP_USER, 
            to:email, 
            subject:"Reset Password", 
            html:`<p>Your password reset <a href='${resetPasswordLink}'>link</a></p>`
        });

        return res
        .status(200)
        .json({success:true, message:`Reset password link sent to ${email}`});            
    }
    catch(err){
        return next(err);
    }

} 

export const resetPassword = async(req, res, next) => {
    try{
        const {resetPasswordToken} = req.query;
        const {password} = req.body;

        if(!resetPasswordToken){
            return next(new CustomError(400, "There is no reset password token"));
        }

        const user = await User.findOne(
            {$and : [
            {resetPasswordToken:resetPasswordToken}, 
            {resetPasswordTokenExpires: {$gt: Date.now()}}]})
            .select("resetPasswordToken resetPasswordTokenExpires password"
        )
        
        if(!user){
            return next(new CustomError(400, "Your reset password token wrong or expired"));
        }

        if(!checkPassword(password)){
            return next(new CustomError(400, "Password must contain: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"))
        }

        user.password = password;
        user.resetPasswordToken = null;
        user.resetPasswordTokenExpires = null;
        user.lastPasswordChangedAt = Date.now();
        await user.save();
        
        return res.status(200).json({success:true, message:"Your password has been changed"});
    }
    catch(err){
        return next(err);
    }
}

export const changePassword = async(req, res, next) => {
    try{
        const {currentPassword, currentPasswordAgain, newPassword} = req.body;
        const user = await User.findOne({_id:req.user.id}).select("_id password lastPasswordChanged");
        
        if(currentPassword != currentPasswordAgain) {
            return next(CustomError(400, "These passwords do not match"));
        }
        console.log("burada");

        if(!bcrypt.compareSync(currentPassword, user.password)){
            return next(new CustomError(400, "Your old password is wrong"));
        }

        if(!checkPassword(newPassword)){
            return next(new CustomError(400, "Password must contain: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"));
        }

        user.password = newPassword;
        user.lastPasswordChangedAt = Date.now();
        await user.save();

        return res
        .cookie("access_token", null, {maxAge: Date.now()})
        .status(200)
        .json({success:true, message:"Your password has been changed"}); //fresh loging
    }
    catch(err){
        return next(err);
    }
}

export const deactiveAccount = async(req, res, next) => {
    try{
        const {password} = req.body;
        
        if(!password){
            return next(new CustomError(400, "You have to enter your password"));
        }

        const user = await User.findOne({
            _id:req.user.id
        })
        .select("_id password isActive");
        
        if(!bcrypt.compareSync(password, user.password)){
            return next(new CustomError(400, "Invalid password"));
        }

        user.isActive = false;
        await user.save();

        return res
        .cookie("access_token", null, {maxAge: Date.now()})
        .status(200)
        .json({success:true, message:"Your account has been deactivated"});
    }
    catch(err){
        return next(err);
    }
}