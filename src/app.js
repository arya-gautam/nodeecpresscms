const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const adminauth = require("./middleware/adminauth");
require('dotenv').config()
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
const Categories = require("./models/categories");


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
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
/*if conditional statement */
hbs.registerHelper('ifeq', function (a, b, options) { 
    if (a == b) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
 })
 /*sl number auto incriment  */
 hbs.registerHelper("sl", function (index){
    return index + 1;
});


/*Controller or router export */
const studentRouter = require("./routers/student");
const adminRouter = require("./routers/admin");
const categoriesRouter = require("./routers/categories");
const topsliderimageRouter = require("./routers/topsliderimage");
const topsliderheadingRouter = require("./routers/topsliderheading");
const overviewRouter = require("./routers/overview");
const amenitiesRouter = require("./routers/amenities");
const floorplaneRouter = require("./routers/floorplan");
const pricelistRouter = require("./routers/pricelist")
const photogallery = require("./routers/photogallery");
const dynamicRouter = require("./routers/dynamic");

app.use(
    studentRouter,
    adminRouter,
    categoriesRouter,
    topsliderimageRouter,
    topsliderheadingRouter,
    overviewRouter,
    amenitiesRouter,
    floorplaneRouter,
    pricelistRouter,
    photogallery,
    dynamicRouter);




/*load index page */
// app.get("/",async(req,res)=>{
//     try {
//         categories  = await Categories.find();
//         res.status(201).render("index",{categories:categories});
//     } catch (error) {
//         res.status(404).send(error);
//     } 
// });

/*load error page */
app.get("/*",adminauth,(req,res)=>{
    res.status(404).send({error:"404"});
});



/*listen server port */
app.listen(port,()=>{
console.log(`Server Run this ${port}  PORT`);
})


