const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createsession=async function(req,res)
{
    try{
      let user=User.findOne({email:req.body.email});
      if(!user || user.password !=req.body.password)
      {
          return res.json(422,{
              message:"Invalid username/password"
          });
      }
      return res.json(200,{
          message:"Sign in successfully here token created",
          data:{
              token:jwt.sign(user.toJSON(),'codeial',{expressIn:'100000'})
          }
      })
    }
    catch(err)
    {
        return res.json(500,{
            message:"Error in internal server"
        })
    }
}