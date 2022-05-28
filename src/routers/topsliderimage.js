const express = require("express");
const topsliderimageRouter = new express.Router();
const Topsliderimages = require("../models/topsliderimages");
const Categories = require("../models/categories");
const adminauth = require("../middleware/adminauth");
const path = require("path");
const multer = require("multer");
// const staticPath = path.join(__dirname,"../../public");

/*Load topSliderImages page */
topsliderimageRouter.get("/admin/topSliderImages",adminauth,async(req,res)=>{
    Topsliderimages.find({}).populate('page_name').exec((err,result)=>{
        if(err) throw(err);
        //res.status(201).send({result:result});
       res.status(201).render("topSliderImages",{result:result});
    })
});
/*load add topsliderimage */
topsliderimageRouter.get("/admin/addTopSliderImage",adminauth,async(req,res)=>{
    var categories = await Categories.find();
res.status(201).render("addTopSliderImage",{categories:categories});
});

/*image upload in topslider image */
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../../public/uploads/topsliderimages'));
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
})
const upload = multer({storage:storage});

/*insert topsliderimage */
topsliderimageRouter.post("/admin/topSliderImages",adminauth,upload.single('image'),async(req,res)=>{
    try { 
        const topsliderimage = new Topsliderimages({
        page_name:req.body.page_name,
        page_title:req.body.page_title,
        image:req.file.filename,
       })
       const inserted = await topsliderimage.save();
       Topsliderimages.find({}).populate('page_name').exec((err,result)=>{
        if(err) throw(err);
       res.status(201).render("topSliderImages",{result:result,status:"success",title:"Congratulations...",message:"Data Added Successfully"});
    })
    } catch (error) {
      res.status(404).send(error);
    }
});
/*delete topslider image */
topsliderimageRouter.delete("/admin/topSliderImages/:id",(req,res)=>{
    const _id = req.params.id;
    Topsliderimages.findByIdAndDelete(_id)
    .then(result => {
        req.flash('message','Data Deleted Successfully');
        res.json({redirect:'/admin/topSliderImages'});
    }).catch(err => {
        res.status(404).send(err);
    })
});
/*load edit topsliderimage page */
topsliderimageRouter.get("/admin/editTopSliderImage/:id",adminauth,async(req,res)=>{
try {
    const result = await Topsliderimages.findById(req.params.id);
    if(result)
    {
        const categories = await Categories.find();
        res.status(201).render("editTopSliderImage",{set:result,id:result.page_name[0],categories:categories});
    }
} catch (error) {
   console.log(error); 
}
});
/* update topslider image details */
topsliderimageRouter.post("/admin/topSliderImages/:id",adminauth,upload.single('image'),async(req,res)=>{
    try {
        const _id = req.params.id;
        if (req.file) {
            const topsliderimage = ({
                page_name:req.body.page_name,
                page_title:req.body.page_title,
                image:req.file.filename,
               })
             const updateTopSliderImage = await Topsliderimages.findByIdAndUpdate(_id,topsliderimage,{new :true});
          } else {
            const updateTopSliderImage = await Topsliderimages.findByIdAndUpdate(_id,req.body,{new :true});
          }
          Topsliderimages.find({}).populate('page_name').exec((err,result)=>{
            if(err) throw(err);
           res.status(201).render("topSliderImages",{result:result,status:"success",title:"Congratulations...",message:"Data Updated Successfully"});
          })   
    } catch (error) {
        res.status(201).send(error);
    }
});

module.exports = topsliderimageRouter;
