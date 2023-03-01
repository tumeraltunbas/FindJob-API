import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createToken } from "../helpers/utils/utils.js";


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
    workExperiences: [
        {
            title: {
                type:String,
                required:[true, "Title can not be null"],
            },
            companyName: {
                type:String,
                required:[true, "Company Name can not be null"]
            },
            employmentType: {
                type:String,
                required:[true, "Employment type can not be null"],
                enum: ["Full Time", "Part Time", "Internship", "My Job"],
            },
            location: {
                type:String,
                required:[true, "Location can not be null"],
            },
            startedAt: {
                type:Date,
                required:[true, "Started At can not be null"]
            },
            endedAt:{
                type:Date,
            },
            description: {
                type:String,
                default:null
            }
        }
    ],
    educationalInformations: [
        {
            schoolName: {
                type:String,
                required:[true, "School Name can not be null"]
            },
            degree: {
                type:String,
                required:[true, "Degree can not be null"],
                enum:["Bachelor's Degree", "Associate Degree", "Master's Degree", "Doctoral Degree", "Highschool Degree"]
            },
            major: {
                type:String,
                required:[true, "Major can not be null"]
            },
            gpa: {
                type: Number,
                default:null
            },
            startedAt: {
                type:Date,
                required:[true, "Started At can not be null"]
            },
            endedAt:{
                type:Date,
                required:[true, "Ended At can not be null"]
            },
        }
    ],
    certificates: [{
        title:{
            type:String,
            required:[true, "Title can not be null"]
        },
        institution: {
            type: String,
            required:[true, "Institution can not be null"],
        },
        date: {
            type: Date,
            required:[true, "Date can not be null"]
        }
    }],
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
    return hash;
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


export const User = mongoose.model("User", UserSchema);