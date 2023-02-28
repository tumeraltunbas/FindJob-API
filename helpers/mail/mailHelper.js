import nodemailer from "nodemailer";

export const mailHelper = (options) => {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    transport.sendMail(options, function(err){
        if(err){
            console.log(err);
        }
    });
};