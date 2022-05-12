const jwt = require("jsonwebtoken");
const adminRegister = require("../models/registeradmins");
require('dotenv').config();

const adminauth = async(req,res,next)=>{
try {
    const  token = req.cookies.jwt;
   const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
    const adminData = await adminRegister.findOne({_id:verifyToken._id});
    //console.log(adminData);
    req.token = token;
    req.adminData = adminData;
    console.log(token);
   next();
} catch (error) {
     res.status(401).render("login",{message:"Please Login First !!!",status:"error",title:"Opps..."});
     //res.status(401).send({error,msg:"mkllk"});
}
}

module.exports = adminauth;