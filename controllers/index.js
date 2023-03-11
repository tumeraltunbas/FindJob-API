import { Company } from "../models/Company.js";
import { Job } from "../models/Job.js";
import { User } from "../models/User.js";

export const feed = async(req, res, next) => {
    try{
        const user = await User.findOne({
            _id:req.user.id
        });

        if(user.role === "employee"){

            const interests = user.interests;

            const companies = await Company.find({
                sector: {$in: interests}
            }).select("_id");

            const jobs = await Job.find({
                company: companies
            })
            .select("_id title ")
            .populate({path: "company", select:"logoUrl name location"});

            return res.status(200).json({success:true, jobs:jobs});
            
        }
        else{

            const company = await Company.findOne({
                user:req.user.id
            }).select("_id");

            const jobs = await Job.find({
                company:company
            });

            return res.status(200).json({success:true, jobs:jobs});
        }
    }
    catch(err){
        return next(err);
    }
}

export const search = async(req, res, next) => {
    try{
        const {search} = req.body;
        const regex = new RegExp(search, "i");

        const companies = await Company.find({
            name: regex
        })
        .select("_id name logoUrl")
        .limit(3);

        const jobs = await Job.find({
            title: regex
        })
        .select("_id title")
        .populate({path: "company", select: "name logoUrl"})
        .limit(3);

        const users = await User.find({
            username:regex
        })
        .select("_id username profilePhotoUrl")
        .limit(3);

        return res.status(200).json({success:true, companies:companies, jobs:jobs, users:users});
    }
    catch(err){
        return next(err);
    }
}