import CustomError from "../helpers/error/CustomError.js";
import { Company } from "../models/Company.js";
import slugify from "slugify";

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