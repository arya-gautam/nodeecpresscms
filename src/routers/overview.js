const express = require("express");
const overviewRouter = express.Router();
const Categories = require("../models/categories");
const Overview = require("../models/overview");
const adminauth = require("../middleware/adminauth");
const path = require("path");
const multer = require("multer");


/*load overview page  */
overviewRouter.get("/admin/overview",adminauth,async(req,res)=>{
try {
    Overview.find({}).populate('page_name').exec((err,result)=>{
        if(err) throw(err);
        //res.status(201).send({result:result});
       res.status(201).render("overview",{result:result,message:req.flash('message'),status:req.flash('status'),error:req.flash('success')});
    })
} catch (error) {  console.log(error);}
});
/*load addoverview page */
overviewRouter.get("/admin/addOverview",adminauth,async(req,res)=>{
    try {
        const categories = await Categories.find();
        res.status(201).render("addOverview",{categories:categories})
    } catch (error) { console.log(error);}
});
/*image upload in overview section */
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../../public/uploads/overview'));
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
})
const upload = multer({storage:storage});
/*Insert overview data */
overviewRouter.post("/admin/overview",adminauth,upload.single('image'),async(req,res)=>{
try {
    const overview = new Overview({
        page_name:req.body.page_name,
        heading:req.body.heading,
        page_section:req.body.page_section,
        image:req.file.filename,
        description:req.body.description
    })
   const inserted = await overview.save();
   Overview.find({}).populate('page_name').exec((err,result)=>{
    if(err) throw(err);
   res.status(201).render("overview",{result:result,status:"success",title:"Congratulations...",message:"Data Added Successfully"});
})
} catch (error) {
    const categories = await Categories.find();
    res.status(201).render("addOverview",{categories:categories,set:req.body,error})
}
});
/*delete data from overview page */
overviewRouter.delete("/admin/overview/:id",(req,res)=>{
    const _id = req.params.id;
    Overview.findByIdAndDelete(_id)
    .then(result => {
        req.flash('message','Data Deleted Success');
        req.flash('error','success');
        req.flash('status','Overview');
        res.json({redirect:'/admin/overview'});
    }).catch(err => {
        res.status(404).send(err);
    })
});
/*load edit overview page */
overviewRouter.get("/admin/editOverview/:id",adminauth,async(req,res)=>{
try {
    const result = await Overview.findById(req.params.id);
    const categories = await Categories.find();
    res.status(201).render("editOverview",{categories:categories,set:result});
    
} catch (error) {
    console.log(error);
}
});
/*data update of overview page */
overviewRouter.post("/admin/overview/:id",adminauth,upload.single('image'),async(req,res)=>{
try {
    const _id = req.params.id;
    if(req.file)
    {  const overview =  ({
        page_name:req.body.page_name,
        heading:req.body.heading,
        page_section:req.body.page_section,
        image:req.file.filename,
        description:req.body.description
    })
    const updated = await Overview.findByIdAndUpdate(_id,overview,{new :true});
    }else
    {const updated = await Overview.findByIdAndUpdate(_id,req.body,{new :true});}

    Overview.find({}).populate('page_name').exec((err,result)=>{
        if(err) throw (err)
        res.status(201).render('overview',{result:result,status:"success",title:"Congratulations...",message:"Data Updated Successfully"})
    })

} catch (error) {
    console.log(error);
}
});



module.exports = overviewRouter;

