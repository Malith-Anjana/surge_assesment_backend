const nodemailer = require('nodemailer')

const emailSend = async(email, subject, text)=>{
    try{
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            auth:{
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        });
        await transporter.sendMail({
            from: process.env.USER,
            to:email,
            subject: subject,
            text: `URL: ${text.url} \n Password: ${text.randomPass}`
        });
        console.log("Email send successfully");
    }
    catch(error){
        console.log(error);
    }
}

module.exports = emailSend;