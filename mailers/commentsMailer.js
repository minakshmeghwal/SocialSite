const nodemailer=require('../config/nodemailer');
module.exports.newComment=(comment)=>{
    console.log('inside new comment mailer');

    nodemailer.transporter.sendMail({
        from:'anokhipehelotp@gmail.com',
        to : comment.email,
        subject:'new comment published',
        html:'<h1> yup your comment published</h1>'
    },(err,info)=>{
        if(err)
        {
            console.log('error in sending mail');
            return;
        }
        console.log('message sent',info);
        return;
    });
}
