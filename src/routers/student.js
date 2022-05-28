const express = require("express");
const studentRouter = new express.Router();
const Register = require("../models/registers");

studentRouter.get("/admin/students", async (req,res)=>{
    try {
        const RegistredStudents = await Register.find();
        //res.send(RegistredStudents);
       res.status(201).render("students",{result:RegistredStudents,message:req.flash('message')});
    } catch (error) {
        res.status(400).send(error)
    }
});

studentRouter.get("/api/students", async (req,res)=>{
try {
    const RegistredStudents = await Register.find();
    res.status(201).send(RegistredStudents);
   //res.status(201).render("students",{result:RegistredStudents,message:req.flash('message')});
} catch (error) {
    res.status(400).send(error)
}
});

studentRouter.get("/admin/students/:id", async (req,res)=>{
try {
    const _id = req.params.id;
     const RegistredStudent = await Register.findById(_id);
    if(RegistredStudent)
    {res.status(201).render("editstudent",{set:RegistredStudent});}
    else{res.status(404).render("404");} 
} catch (error) {
    res.status(400).send(error)
}
});

// studentRouter.get("/admin/students/:id", async (req,res)=>{
//     try {
//         const _id = req.params.id;
//          const RegistredStudent = await Register.findById(_id);
//         if(RegistredStudent)
//         //{res.status(201).render("editstudent",{set:RegistredStudent});}
//         {res.status(201).send({set:RegistredStudent});}
//         else{res.status(404).render("404");} 
//     } catch (error) {
//         res.status(400).render(error)
//     }
// });


studentRouter.post("/admin/students/:id",async(req,res)=>{
try{
    const _id = req.params.id;
    const updateStudent = await Register.findByIdAndUpdate(_id,req.body,{new :true});
    const RegistredStudents = await Register.find();
    req.flash('message','Data Updated Successfully');
    res.redirect("/admin/students");
    //res.status(201).render("students",{result:RegistredStudents});
   console.log(updateStudent);
}catch(err){
    res.status(404).send(err);
}
})



studentRouter.get("/admin/register",(req,res)=>{
res.render("register");
});


studentRouter.post("/admin/students", async (req,res)=>{
try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if(password === cpassword)
    {
        const registerStudent = new Register({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            phone : req.body.phone,
            password : password,
            confirmpassword : cpassword,
            address : req.body.address
        })
        
        const Registred = await registerStudent.save();
        var RegistredStudents = await Register.find();
       
       // req.flash('message','Data Added Successfully');
        // res.redirect("/admin/students");
        res.status(201).render("students",{result:RegistredStudents,message:"Data Added Successfully"});
    }else{
        const RegistredStudents = await Register.find();
        res.render("students",{result:RegistredStudents,set:req.body,passIsmatch:"Passwords Must Be Same"});
    }
} catch (error) {
   //res.status(400).send(error);
  res.render("register",{error,set:req.body});
}
})


studentRouter.delete("/admin/students/:id",(req,res)=>{
    const _id = req.params.id;
    Register.findByIdAndDelete(_id)
    .then(result => {
        req.flash('message','Data Deleted Successfully');
        res.json({redirect:'/admin/students'});
    }).catch(err => {
        res.status(404).send(err);
    })
})

module.exports = studentRouter;