import CustomError from "../helpers/error/CustomError.js";
import { mailHelper } from "../helpers/mail/mailHelper.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async(req, res, next) => {
    try{
        const {firstName, lastName, email, password, gender, dateOfBirth, role} = req.body;
        const {COOKIE_EXPIRES, NODE_ENV, DOMAIN, SMTP_USER} = process.env;
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

        if(role != "employee" && role != "employer"){ //avoid potential exploit
            return next(new CustomError(400, "Invalid role"));
        }

        if(!passwordRegex.test(password)){
            return next(new CustomError(400, "Password must contain: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."));
        }

        const user = await User.create({firstName:firstName, lastName:lastName, email:email, password:password, gender:gender, dateOfBirth:dateOfBirth,role:role});
        const jwtToken = user.createJwt();
        const emailVerificationToken = user.createEmailVerificationToken();
        await user.save();

        const emailVerificationLink = `${DOMAIN}/api/auth/emailVerification?emailVerificationToken=${emailVerificationToken}`;
        mailHelper({from:SMTP_USER, to:user.email, subject:"Email Verification", html:`<p>You email verification <a href='${emailVerificationLink}'>link</a></p>`});

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