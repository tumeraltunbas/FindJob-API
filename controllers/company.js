import CustomError from "../helpers/error/CustomError.js";
import { Company } from "../models/Company.js";
import slugify from "slugify";
import { Job } from "../models/Job.js";
import { fileUploadHelper } from "../helpers/fileUpload/fileUpload.js";

export const createCompany = async(req, res, next) => {
    try{
        const {name, slogan, about, sector, location, website, slug} = req.body;
        
        const modifiedSlug = slugify(slug, {lower:true});

        const company = await Company.findOne({
            slug:modifiedSlug
        }).select("_id slug");

        if(company){
            return next(new CustomError(400, "This slug is already in use. Choose another one"));
        }


        await Company.create({
            name:name,
            slogan:slogan,
            about:about,
            sector:sector,
            location:location,
            website:website,
            slug:modifiedSlug,
            user:req.user.id
        });

        return res.status(200).json({success:true, message:"Company has been created"});
    }
    catch(err){
        return next(err);
    }
}

export const uploadLogo = async(req, res, next) => {
    try{
        const fileName = fileUploadHelper(req, next);
        
        await Company.findOneAndUpdate(
            {user:req.user.id},
            {
                logo:fileName
            }
        );
        
        return res.status(200).json({success:true, message:"Logo has been uploaded"});
    }
    catch(err){
        return next(err);
    }
}

export const deleteCompany = async(req, res, next) => {
    try{
        const {companyId} = req.params;
        
        await Company.findByIdAndUpdate(
            {_id:companyId},
            {
                isVisible:false
            },
        );

        return res.status(200).json({success:true, message:"Company has been deleted"});
    }
    catch(err){
        return next(err);
    }
}

export const updateCompany = async(req, res, next) => {
    try{
        const information = req.body;
        const {companyId} = req.params;
        
        if(information.slug){
            return next(new CustomError(400, "Slug can not be updated"));
        }

        await Company.findByIdAndUpdate(
            {_id:companyId},
            {
                ...information   
            }
        );

        return res.status(200).json({success:true, message:"Company has been updated"});
    }
    catch(err){
        return next(err);
    }
}

export const getCompany = async(req, res, next) => {
    try{
        const {slug} = req.params;

        const company = await Company.findOne({
            slug:slug,
            isVisible:true
        })
        .select(`
            _id
            name
            slogan
            about
            sector
            location
            logoUrl
            coverUrl
            website
        `);

        const jobs = await Job.find({
            company:company.id
        })
        .select("title location appliedUserCount createdAt");

        return res.status(200).json({success:true, company:company, jobs:jobs});
    }
    catch(err){
        return next(err);
    }
}