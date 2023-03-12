import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createToken } from "../helpers/utils/utils.js";
import { Company } from "./Company.js";
import { Job } from "./Job.js";


const UserSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:[true, "First Name can not be null"],
        minlength: [2, "First Name can not be less than 2 characters"],
        maxlength: [15, "First Name can not be more than 15 characters"]
    },
    lastName: {
        type:String,
        required:[true, "Last Name can not be null"],
        minlength: [2, "Last Name can not be less than 2 characters"],
        maxlength: [20, "Last Name can not be more than 20 characters"]
    },
    username: {
        type:String,
        required:[true, "Username can not be null"],
        unique:true
    },
    email: {
        type:String,
        required:[true, "Email can not be null"],
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Your email format must be match with test@example.com"]
    },
    password: {
        type:String,
        required:[true, "Password can not be null"],
        select:false,   
    },
    dateOfBirth: {
        type:Date,
        required:[true, "Date of Birth can not be null"]
    },
    gender:{
        type: Boolean,
        required:[true, "Gender can not be null"]
    },
    interests: {
        type: Array,
        default:null
    },
    role: {
        type:String,
        enum: ["employer", "employee", "admin"],
        required:[true, "Role can not be null"]
    },
    profilePhotoUrl: {
        type:String,
        default: "profile.jpg"
    },
    personalInformations: {
        about: {
            type:String,
            default:null
        },
        website: {
            type:String,
            default:null
        },
        state: {
            type: String,
            default:null
        },
        city: {
            type: String,
            default:null
        },
        isMarried: {
            type: Boolean,
            default:null
        }
    },
    experiences: [
        {
            type:mongoose.Schema.ObjectId,
            ref:"Experience"
        }
    ],
    educations: [
        {
            type: mongoose.Schema.ObjectId,
            ref:"Education"
        }
    ],
    certificates: [
        {
            type: mongoose.Schema.ObjectId,
            ref:"Certificate"
        }
    ],
    emailVerificationToken: {
        type:String,
        default:null
    },
    emailVerificationTokenExpires: {
        type:Date,
        default:null,
    },
    isEmailVerified: {
        type:Boolean,
        default:false
    },
    emailVerifiedAt: {
        type:Date,
        default:null
    },
    resetPasswordToken: {
        type:String,
        default:null
    },
    resetPasswordTokenExpires: {
        type:Date,
        default:null
    },
    lastPasswordChangedAt: {
        type:Date,
        default:null
    },
    isBlocked: {
        type:Boolean,
        default:false
    },
    isActive: {
        type:Boolean,
        default:true
    },
    createdAt: {
        type:Date,
        default:Date.now()
    },
});

//Model Methods
UserSchema.methods.createJwt = function(){
    const {JWT_SECRET_KEY, JWT_EXPIRES} = process.env;
    const payload = {
        id:this._id,
    };    
    const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn:JWT_EXPIRES});
    return token;
};

UserSchema.methods.createEmailVerificationToken = function(){
    const {EMAIL_VERIFICATION_CODE_EXPIRES} = process.env;
    const token = createToken();
    this.emailVerificationToken = token;
    this.emailVerificationTokenExpires = new Date(Date.now() + Number(EMAIL_VERIFICATION_CODE_EXPIRES));
    return token;
};

UserSchema.methods.createResetPasswordToken = function(){
    const {RESET_PASSWORD_TOKEN_EXPIRES} = process.env;
    const token = createToken();
    this.resetPasswordToken = token;
    this.resetPasswordTokenExpires = new Date(Date.now() + Number(RESET_PASSWORD_TOKEN_EXPIRES));
    return token;
}

//Hooks
UserSchema.pre("save", function(next){
    if(this.isModified("password")){
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(this.password, salt);
        this.password = hash;
        next();
    }
    next();
});

UserSchema.pre("save", async function(next){
    if(this.isModified("isActive")){
        
        if(this.isActive === false){
        
            await Company.findOneAndUpdate(
                { user: req.user.id },
                {isVisible:false}
            );
            
        }
    }
});

export const User = mongoose.model("User", UserSchema);