import {Certificate} from "../models/Certificate.js";

export const createCertificate = async(req, res, next) => {
    try{
        const {title, institution, date} = req.body;

        await Certificate.create({
            title:title,
            institution:institution,
            date:date,
            user:req.user.id
        });
        
        return res.status(200).json({success:true, message:"Certificate has been created"});
    }
    catch(err){
        return next(err);
    }
}

export const deleteCertificate = async(req, res, next) => {
    try{
        const {certificateId} = req.params;

        await Certificate.findByIdAndUpdate(
            {_id:certificateId},

            {
                isVisible:false
            }
        );

        return res.status(200).json({success:true, message: "Certificate has been deleted"});
    }
    catch(err){
        return next(err);
    }
}

export const updateCertificate = async(req, res, next) => {
    try{
        const {certificateId} = req.params;
        const informations = req.body;

        await Certificate.findByIdAndUpdate(
            {_id:certificateId},

            {
                ...informations
            }
        );

        return res.status(200).json({success:true, message:"Certificate has been updated"});

    }
    catch(err){
        return next(err);
    }
}