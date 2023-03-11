import CustomError from "../error/CustomError.js";
import RootPath from "app-root-path";
import { generate } from "randomstring";

export const fileUploadHelper = (req, next) => {
    
    if(!req.files){
        return next(new CustomError(400, "There is no file to upload"));
    }
    
    const file = req.files.file;
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];

    if(!allowedMimeTypes.includes(file.mimetype)){
        return next(new CustomError(400, "You can only upload .jpeg, .png, .jpg files"));
    }

    const extension = file.name.split(".")[1];

    const fileName = String(req.user.id + "_" + generate(5));
    file.name = fileName;

    const uploadPath = RootPath.path + "\\public\\" + file.name + "." + extension;
    
    file.mv(uploadPath, function(err){
        if(err){
            return next(err);
        }
    });

    return file.name;
}