const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

/* servre side form validation */
// const bodyParser = require("body-parser");
// const {check, validationResult} = require("express-validator");
//const urlencodedParser = bodyParser.urlencoded({extended:false});
/* set port  */
const port = process.env.PORT || 8000;
/*views engine path set*/
const staticPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"./templates/admin/views");
const partialPath = path.join(__dirname,"./templates/admin/partials");
app.use(express.static(staticPath));
app.set("view engine","hbs");
app.set('views',viewsPath);
hbs.registerPartials(partialPath);
/* session & flase message */
const session = require('express-session');
const flash = require('connect-flash');

app.use(session({
    secret: 'secret',
    resave: false,
    cookie :{maxAge:600000},
    saveUninitialized: false
  }));
  app.use(flash());

/*database connection*/
require("./db/conn");
/* Student Register Rule*/
const Register = require("./models/registers");
/* Responce show in json format */
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get("/admin/login",(req,res)=>{
    res.render("login");
});

app.get("/",(req,res)=>{
    res.render("login");
});

app.get("/admin",(req,res)=>{
    res.render("login");
});

app.get("/admin/students", async (req,res)=>{
        try {
            const RegistredStudents = await Register.find();
            //res.send(RegistredStudents);
           res.status(201).render("students",{result:RegistredStudents,message:req.flash('message')});
        } catch (error) {
            res.status(400).send(error)
        }
});

app.get("/admin/students/:id", async (req,res)=>{
    try {
        const _id = req.params.id;
         const RegistredStudent = await Register.findById(_id);
        if(RegistredStudent)
        {res.status(201).render("editstudent",{set:RegistredStudent});}
        else{res.status(404).render("404");} 
    } catch (error) {
        res.status(400).render(error)
    }
});


app.post("/admin/students/:id",async(req,res)=>{
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



app.get("/admin/register",(req,res)=>{
    res.render("register");
});


app.post("/admin/students", async (req,res)=>{
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
            const RegistredStudents = await Register.find();
            req.flash('message','Data Added Successfully');
             res.redirect("/admin/students");
            //res.status(201).render("students",{result:RegistredStudents,successmsg:"Data Added"});
        }else{
            //res.send("Password Does not matched");
            res.render("register",{set:req.body,passIsmatch:"Passwords Must Be Same"});
        }
    } catch (error) {
        //console.log(error).firstname;
      // res.status(400).send(error.keyPattern)
      res.render("register",{error,set:req.body});
    }
})


app.delete("/admin/students/:id",(req,res)=>{
        const _id = req.params.id;
        Register.findByIdAndDelete(_id)
        .then(result => {
            req.flash('message','Data Deleted Successfully');
            res.json({redirect:'/admin/students'});
        }).catch(err => {
            res.status(404).send(err);
        })
})




app.get("/admin/dashboard",(req,res)=>{
    res.render("index");
});

app.get("/*",(req,res)=>{
    res.status(404).render("404");
});

app.listen(port,()=>{
console.log(`Server Run this ${port}  PORT`);
})


