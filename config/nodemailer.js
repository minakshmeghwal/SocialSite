const nodemailer=require('nodemailer');
const path=require('path');
const ejs=require('ejs');


//this give the info of mail transfer
let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'anokhipehelotp@gmail.com',
        pass:'Aplotp@123'
    }
});


//this is used for mail used ejs file
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template)
        {
            if(err)
            {
                console.log('error in rendering file');
                return;
            }
            mailHTML=template;//template is combo of data and path
        }
    )
    return mailHTML;

}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}