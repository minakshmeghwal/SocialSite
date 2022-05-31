module.exports.home=function(req,res)// through this it can access this method outside the file
{   //console.log(req.cookie);

    return res.render('home',{
        title:"Home"
    });
}