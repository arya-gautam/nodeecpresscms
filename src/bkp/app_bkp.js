const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
/* servre side form validation */
const bodyParser = require("body-parser");
const {check, validationResult} = require("express-validator");
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

/*database connection*/
require("./db/conn");
/* Student Register Rule*/
const Register = require("./models/registers");
const { json } = require("stream/consumers");
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
            //res.send(studentsData);
           res.status(201).render("students",{result:RegistredStudents});
        } catch (error) {
            res.status(400).send(error)
        }
});

app.get("/admin/register",(req,res)=>{
    res.render("register");
});



app.post("/admin/students",[
    check('firstname','First Name Must 3+')
    .exists()
    .isLength({min : 3}),
    check('email','email is not valid')
    .isEmail()
    .normalizeEmail()
], async (req,res)=>{
    try {

        const errors = validationResult(req.body.email)
        if(!errors.isEmpty()){
            // return res.status(422).jsonp(errors.array())
            const alert = errors
            // res.render("register",{
            //     alert 
            // })
            console.log(alert);
        }
        // res.json(req.body);
      
    } catch (error) {
        res.status(400).send(error)
    }
})



// app.post("/admin/students", async (req,res)=>{
//     try {
//         const password = req.body.password;
//         const cpassword = req.body.confirmpassword;
//         if(password === cpassword)
//         {
//             const registerStudent = new Register({
//                 firstname : req.body.firstname,
//                 lastname : req.body.lastname,
//                 email : req.body.email,
//                 phone : req.body.phone,
//                 password : password,
//                 confirmpassword : cpassword,
//                 address : req.body.address
//             })
         
//             const Registred = await registerStudent.save();
//             res.redirect("/admin/students");
//         }else{
//             res.send("Password Does not matched");
//         }
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })



app.get("/admin/dashboard",(req,res)=>{
    res.render("index");
});

app.get("/*",(req,res)=>{
    res.status(404).render("404");
});

app.listen(port,()=>{
console.log(`Server Run this ${port}  PORT`);
})


