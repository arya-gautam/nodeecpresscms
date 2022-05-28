const express = require("express");
/* chnage  route of specific aminities */
const amenitiesRouter = express.Router();
/*login auth middeleware */
const adminauth = require("../middleware/adminauth");
//const adminauth_API = require("../middleware/adminauth")
/*amenities model ini */
const Amenities = require("../models/amenities");
/*categories model ini */
const Categories = require("../models/categories");
/*multer ini for image uplaod */
const multer = require("multer");
/*path ini  */
const path = require("path");

/*load aminities page */
amenitiesRouter.get("/admin/amenities",adminauth,async(req,res)=>{
    try {
        Amenities.find({}).populate('page_name').exec((err,result)=>{
            if(err) throw(err);
            res.status(201).render("amenities",{result:result,message:req.flash('message'),status:req.flash('status'),error:req.flash('error')});
        });
    } catch (error) {
        console.log(error);
    }
});
/*use for api */
amenitiesRouter.get("/api/amenities",adminauth,async(req,res)=>{
    try {
        Amenities.find({}).populate('page_name').exec((err,result)=>{
            if(err) throw(err);
            res.status(201).send({result:result});
        });
    } catch (error) {
        res.status(404).send({error:error});
    }
});

/*load add amenity page */
amenitiesRouter.get("/admin/addAmenity",adminauth,async(req,res)=>{
    try {
        const categories = await Categories.find();
        res.status(201).render('addAmenity',{categories:categories});
    } catch (error) { console.log(error); }
});
/*uplaod image of amenities */
const storage = multer.diskStorage({
    destination:function(req,file,cb)
    {
    cb(null,path.join(__dirname,"../../public/uploads/amenities"));
    },filename:function(req,file,cb){
       const name =  Date.now()+ '-' +file.originalname
        cb(null,name);
    }
}) 
const upload = multer({storage:storage});


/*insert data of amenity page */
amenitiesRouter.post("/admin/amenities",adminauth,upload.single('image'),async(req,res)=>{
try {
   const amenities = new Amenities({
       page_name:req.body.page_name,
       heading:req.body.heading,
       page_section:req.body.page_section,
       image:req.file.filename,
       created_at:Date(new Date()),
       updated_at:Date(new Date())
   })
   const inserted = await amenities.save();
   Amenities.find({}).populate('page_name').exec((err,result)=>{
       if(err) throw(err)
       res.status(201).render("amenities",{result:result,message:"Data Added Successfully",status:"success",title:"Congratulations..."})
   })
} catch (error) {
    const categories = await Categories.find();
    res.status(404).render("addAmenity",{set:req.body,categories:categories,error});
}
});
/*delete amenities */
amenitiesRouter.delete("/admin/amenities/:id",(req,res)=>{
    const _id = req.params.id;
    console.log(_id);
    Amenities.findByIdAndDelete(_id)
    .then(result => {
        req.flash('message','Data Deleted Success');
        req.flash('error','success');
        req.flash('status','Amenities');
        res.json({redirect:'/admin/amenities'});
    })
    .catch(error => {console.log(error)});
});
/*load edit amenities page */
amenitiesRouter.get("/admin/editAmenity/:id",adminauth,async(req,res) => {
    try {
        const result = await Amenities.findById(req.params.id);
        if(result){
            categories = await Categories.find();
            res.status(201).render("editAmenity",{set:result,categories:categories});
        }
        else{
            res.status(404).send({err:"Something Went Wrong"}); 
        }
    } catch (error) {
        console.log(error);
    }
});
/*update data of amenities */
amenitiesRouter.post("/admin/amenities/:id",adminauth,upload.single('image'),async(req,res)=>{
    try {

        if(req.file){
            const amenities = ({
                page_name:req.body.page_name,
                heading:req.body.heading,
                page_section:req.body.page_section,
                image:req.file.filename,
                updated_at:Date(new Date())
            })
            const updated = await Amenities.findByIdAndUpdate(req.params.id,amenities,{new :true});
        }else{
            const updated = await Amenities.findByIdAndUpdate(req.params.id,req.body,{new :true});
        }
        Amenities.find({}).populate('page_name').exec((err,result)=>{
            if(err) throw(err)
            res.status(201).render("amenities",{result:result,message:"Data Updated Successfully",status:"success",title:"Congratulations..."})
        })
    } catch (error) {
        categories = await Categories.find();
        res.status(404).render("editAmenity",{set:req.body,error,categories:categories})
    }

});


module.exports = amenitiesRouter;

