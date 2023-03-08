import { Job } from "../models/Job.js";

export const getJobs = async(req, res, next) => {
    try{
        const jobs = await Job.find()
        .populate({
            path:"Company", 
            select: "name logoUrl"
        });

        return res.status(200).json({success:true, jobs:jobs});
    }
    catch(err){
        return next(err);
    }
}