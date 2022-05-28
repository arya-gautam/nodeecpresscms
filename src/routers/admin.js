const express = require("express");
const adminRouter = new express.Router();
const adminRegister = require("../models/registeradmins");
const adminauth = require("../middleware/adminauth");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
require('dotenv').config()


/*mail traspoter */
let transporter = nodemailer.createTransport({
    host: "mail.tutorialworlds.com",
    port: 465,
    secure: true,
    auth: {
        user: 'developer@tutorialworlds.com',
        pass: '96089@Developer'
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

/* admin registration */
adminRouter.get("/createaccount",(req,res)=>{
    res.render("createaccount");
})

adminRouter.post("/createaccount",async(req,res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword)
        {
            const registerAdmin = new adminRegister({
                name : req.body.name,
                email : req.body.email,
                password : password,
                confirmpassword : cpassword,
                created_at : new Date(Date.now()),
                updated_at : new Date(Date.now())
            })
            const adminRegistred = await registerAdmin.save();
            const token = await registerAdmin.geterateAuthToken();
            res.cookie("jwt",token,{
            expires:new Date(Date.now() + 600000),
            httpOnly:true,
            // secure:true
            });

            const AdminEmailVerifyToken = `${process.env.APP_URL}/admin/verify?token=${token}`;

            let mailOptions = {
                from: 'developer@tutorialworlds.com',
                to: req.body.email,
                subject: 'Account Verification',
                html: "<div style='font-family:HelveticaNeue-Light,Arial,sans-serif;background-color:#eeeeee'><table align='center' width='100%' border='0' cellspacing='0' cellpadding='0' bgcolor='#eeeeee'><tbody><tr><td><table align='center' width='750px' border='0' cellspacing='0' cellpadding='0' bgcolor='#eeeeee' style='width:750px!important'><tbody><tr><td><table width='690' align='center' border='0' cellspacing='0' cellpadding='0' bgcolor='#eeeeee'><tbody><tr><td colspan='3' height='80' align='center' border='0' cellspacing='0' cellpadding='0' bgcolor='#eeeeee' style='padding:0;margin:0;font-size:0;line-height:0'><table width='690' align='center' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td width='30'></td><td align='center' valign='middle' style='padding:0;margin:0;font-size:0;line-height:0'><a href='https://cmsnodeapp.herokuapp.com/' target='_blank'><img src='#'></a></td><td width='30'></td></tr></tbody></table></td></tr><tr><td colspan='3' align='center'><table width='630' align='center' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td colspan='3' height='60'></td></tr><tr><td width='25'></td><td align='center'><h1 style='font-family:HelveticaNeue-Light,arial,sans-serif;font-size:45px;color:#404040;line-height:48px;font-weight:bold;margin:0;padding:0'>Welcome To<br> CMS</h1></td><td width='25'></td></tr><tr><td colspan='3' height='40'></td></tr><tr><td colspan='5' align='center'><p style='color:#404040;font-size:16px;line-height:24px;font-weight:lighter;padding:0;margin:0'>Congratulations!! You have successfully registered for our website. To login in your account you need to verify your e-mail first.</p><br><p style='color:#404040;font-size:16px;line-height:22px;font-weight:lighter;padding:0;margin:0'> To verift your e-mail address, kindly click on the button below.</p></td></tr><tr><td colspan='4'><div style='width:100%;text-align:center;margin:30px 0'><table align='center' cellpadding='0' cellspacing='0' style='font-family:HelveticaNeue-Light,Arial,sans-serif;margin:0 auto;padding:0'><tbody><tr><td align='center' style='margin:0;text-align:center'><a href='" + AdminEmailVerifyToken + "' style='font-size:21px;line-height:22px;text-decoration:none;color:#ffffff;font-weight:bold;border-radius:2px;background-color:#0096d3;padding:14px 40px;display:block;letter-spacing:1.2px' target='_blank'>Verify User!</a></td></tr></tbody></table></div></td></tr><tr><td colspan='3' height='30'></td></tr></tbody></table></td></tr><table align='center' width='750px' border='0' cellspacing='0' cellpadding='0' bgcolor='#eeeeee' style='width:750px!important'><tbody><tr><td><table width='630' align='center' border='0' cellspacing='0' cellpadding='0' bgcolor='#eeeeee'><tbody><tr><td colspan='2' height='30'></td></tr><tr><td width='360' valign='top'><div style='color:#a3a3a3;font-size:12px;line-height:12px;padding:0;margin:0'>&copy; CMS.</div><div style='line-height:5px;padding:0;margin:0'>&nbsp;</div><div style='color:#a3a3a3;font-size:12px;line-height:12px;padding:0;margin:0'>Developed By Gautam Arya</div></td><td align='right' valign='top'><span style='line-height:20px;font-size:10px'><a href='#' target='_blank'><img src='http://i.imgbox.com/BggPYqAh.png' alt='fb'></a>&nbsp;</span><span style='line-height:20px;font-size:10px'><a href='#' target='_blank'><img src='http://i.imgbox.com/j3NsGLak.png' alt='twit'></a>&nbsp;</span><span style='line-height:20px;font-size:10px'><a href='#' target='_blank'><img src='http://i.imgbox.com/wFyxXQyf.png' alt='g'></a>&nbsp;</span></td></tr><tr><td colspan='2' height='5'></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div>",
              };
        
            transporter.sendMail(mailOptions, function(error, success){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + success.response);
                }
              });
              req.flash('message','Verification link send on your email id so please verify Email Id');
              req.flash('error','error');
              req.flash('status','Registred Successfully');
            res.redirect("admin/login");
            //res.status(201).render("login",{message:"Registred Successfully"});

        }else{
            res.render("createaccount",{set:req.body,passIsmatch:"Passwords Must Be Same"});
        }
    } catch (error) {
        console.log(error);
        res.render("createaccount",{error,set:req.body});
       // res.status(404).send(error);
    }

})

/* admin verify email */

adminRouter.get("/admin/verify",async(req,res)=>{
    try {
        const admintoken = req.query.token;
        const verifyToken = jwt.decode(admintoken,process.env.SECRET_KEY);
        console.log(admintoken);
        if(verifyToken){
            const verifyadmin = await adminRegister.findOne({_id:verifyToken._id});

           if(verifyadmin.isVerified===false)
           {
            verifyadmin.isVerified = true;
            verifyadmin.save();
            res.status(400).render("login",{message:"Account Verifed Successfully",status:"success",title:"Congratulations"});
           }else  if(verifyadmin.isVerified===true)
           {
            res.status(400).render("login",{message:"Account Already Verifed",status:"success",title:"Ohhh..."}); 
           }
        }else
        {
            res.status(400).render("login",{message:"Account Verification Faild",status:"error",title:"Oops..."});
        }
        
    } catch (error) {
        console.log(error);
    }
   
   


});


/* admin login */
adminRouter.get("/admin/login",(req,res)=>{
    res.render("login",{message:req.flash('message'),error:req.flash('error'),status:req.flash('status')});
});
/*OR */
adminRouter.get("/admin",(req,res)=>{
    res.render("login");
});



adminRouter.post("/admin/login",async(req,res)=>{  
try {
    
    if(req.body.email && req.body.password){
    const email = req.body.email;
    const password = req.body.password;

    const verifyuser = await adminRegister.findOne({email:email});
    const isMatch = await bcrypt.compare(password,verifyuser.password);
    const token = await verifyuser.geterateAuthToken();
    res.cookie("jwt",token,{
       // expires:new Date(Date.now() + 600000),
        httpOnly:true,
       // secure:true
    });

    if(isMatch==true)
    {

        if(verifyuser.isVerified==true)
        {
            // res.status(201).render("dashboard")
            res.status(201).redirect("/admin/dashboard");;
        }
        else
        {
            res.status(400).render("login",{set:req.body.email,message:"Your account has been disabled so please verify email id  or contact to admin !!!",status:"error",title:"Oops..."});
        }

       
    }
    else{
        // req.flash('message','Invalid login details');
        res.status(400).render("login",{set:req.body.email,message:"Invalid login details ",status:"error",title:"Oops..."});
    }
    }
    else{
        res.status(400).render("login",{message:"Please Enter Email and Password",status:"error",title:"Oops...",set:req.body.email}); 
    }
} 
catch (error) {
    res.status(400).render("login",{set:req.body.email,message:"Invalid login details ",status:"error",title:"Oops..."});
    //console.log(error);
}
});

adminRouter.get("/admin/dashboard",adminauth,(req,res)=>{
    res.render("dashboard");
});

adminRouter.get("/admin/logout",adminauth,async(req,res)=>{
    try {
        console.log(req.adminData);
        //logout from single devices
        // req.userData.tokens = req.userData.tokens.filter((currentElement)=>{
        //     return currentElement.token !== req.token
        // })
        //log out form all device
        req.adminData.tokens = [];

         res.clearCookie("jwt");
         //console.log("logout success");
        await req.adminData.save();
         res.redirect("/admin/login");
    } catch (error) {
        res.send(error);
    }
});

module.exports = adminRouter;