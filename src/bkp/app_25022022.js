const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
// const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
// const nodemailer = require('nodemailer');
// const jwt = require("jsonwebtoken");
/*temp  */
const adminauth = require("./middleware/adminauth");
require('dotenv').config()
/*multer ini for image upload */
// const multer = require("multer");
// var fs = require('fs');


/*if conditional statement */
hbs.registerHelper('ifeq', function (a, b, options) { 
    if (a === b) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
 })
 /*sl number auto incriment  */
 hbs.registerHelper("sl", function (index){
    return index + 1;
});


/* servre side form validation */
// const bodyParser = require("body-parser");
// const {check, validationResult} = require("express-validator");
//const urlencodedParser = bodyParser.urlencoded({extended:false});
/* set port  */
const port = process.env.PORT || 8000;
/*views engine path set*/
const staticPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"./templates/views");
const partialPath = path.join(__dirname,"./templates/partials");
app.use(express.static(staticPath));
app.set("view engine","hbs");
app.set('views',viewsPath);
hbs.registerPartials(partialPath);
/* session & flase message */
const session = require('express-session');
const flash = require('connect-flash');

 //console.log(process.env.SECRET_KEY);
app.use(session({
    secret: 'secret',
    resave: false,
    cookie :{maxAge:600000},
    saveUninitialized: true
  }));
  app.use(flash());

/*database connection*/
const dbc = require("./db/conn");
/* model ini*/
// const Register = require("./models/registers");
// const adminRegister = require("./models/registeradmins");
// const Categories = require("./models/categories");
// const Topsliderheadings = require("./models/topsliderheadings");
// const Topsliderimages = require("./models/topsliderimages");
// const Overview = require("./models/overview");
/* Responce show in json format */
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
/*Controller or router export */
const studentRouter = require("./routers/student");
const adminRouter = require("./routers/admin");
const categoriesRouter = require("./routers/categories");
const topsliderimageRouter = require("./routers/topsliderimage");
const topsliderheadingRouter = require("./routers/topsliderheading");
const overviewRouter = require("./routers/overview");
const amenitiesRouter = require("./routers/amenities");

app.use(
    studentRouter,
    adminRouter,
    categoriesRouter,
    topsliderimageRouter,
    topsliderheadingRouter,
    overviewRouter,
    amenitiesRouter);


app.get("/",(req,res)=>{
    res.render("index");
});


app.get("/*",adminauth,(req,res)=>{
    res.status(404).render("404");
});

app.listen(port,()=>{
console.log(`Server Run this ${port}  PORT`);
})


