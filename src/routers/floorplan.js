const express = require("express");
/* chnage  route of specific aminities */
const floorplanRouter = express.Router();
/*login auth middeleware */
const adminauth = require("../middleware/adminauth");
/*fplan model ini */
const Floorplan = require("../models/floorplan");
/*categories model ini */
const Categories = require("../models/categories");
/*multer ini for image uplaod */
const multer = require("multer");
/*path ini  */
const path = require("path");
/*load floor plan page*/
floorplanRouter.get("/admin/floorPlanes",async(req,res)=>{
    try {
        Floorplan.find({}).populate('page_name').exec((err,result)=>{
            if(err) throw(err)
            res.status(201).render("floorplans",{result:result,message:req.flash('message'),status:req.flash('status'),error:req.flash('error')});
        })
        
    } catch (error) {
        res.status(404).send(error)
    }
});
/*load ad floor plan page */
floorplanRouter.get("/admin/addFloorplan",adminauth,async(req,res)=>{
    try {
        const categories = await Categories.find();
        res.status(201).render("addFloorplan",{categories:categories});
    } catch (error) {
        res.status(404).send(error)
    }
});
/*multer storage ini for image upload */
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../../public/uploads/floorplans"))
    },filename:function(req,file,cb){
        const name = Date.now() + '-' + file.originalname;
        cb(null,name);
    }
});
const upload = multer({storage:storage});
/*insert data of amenity page */
floorplanRouter.post("/admin/floorPlanes",adminauth,upload.single('image'),async(req,res)=>{
    try {
       const floorplan = new Floorplan({
           page_name:req.body.page_name,
           page_section:req.body.page_section,
           image:req.file.filename,
           created_at:Date(new Date()),
           updated_at:Date(new Date())
       })
       const inserted = await floorplan.save();
       Floorplan.find({}).populate('page_name').exec((err,result)=>{
           if(err) throw(err)
           res.status(201).render("floorplans",{result:result,message:"Data Added Successfully",status:"success",title:"Congratulations..."})
       })
    } catch (error) {
        const categories = await Categories.find();
        res.status(201).render("addFloorplan",{set:req.body,categories:categories,error:error});
    }
    });

/*delete floor plans */
floorplanRouter.delete("/admin/floorPlanes/:id",(req,res)=>{
    const _id = req.params.id;
    Floorplan.findByIdAndDelete(_id)
    .then(result => {
        req.flash('message','Data Deleted Success');
        req.flash('error','success');
        req.flash('status','Floor Plans');
        res.json({redirect:'/admin/floorPlanes'});
    })
    .catch(error => {console.log(error)});
});
/*load edit floorplan page */
floorplanRouter.get("/admin/editfloorPlan/:id",adminauth,async(req,res)=>{
try {
const result = await Floorplan.findById(req.params.id);
if(result){
    const categories = await Categories.find();
    res.status(201).render("editfloorPlan",{set:result,categories:categories})
}else
{res.status(404).send({error:"404"});}

} catch (error) {
    res.status(404).send({error:error});
}
});
/*update data of floor plans page */
floorplanRouter.post("/admin/floorPlanes/:id",adminauth,upload.single('image'),async(req,res)=>{

    try {
       const _id = req.params.id;
        if(req.file)
        {
            const floorplane = ({
                page_name:req.body.page_name,
                page_section:req.body.page_section,
                image:req.file.filename,
                updated_at:Date(new Date())
            })
            const updated = await Floorplan.findByIdAndUpdate(_id,floorplane,{new : true});
        }else
        {
            const updated = await Floorplan.findByIdAndUpdate(_id,req.body,{new : true});
        }

        Floorplan.find({}).populate('page_name').exec((err,result)=>{
            if(err) throw(err)
            res.status(201).render("floorplans",{result:result,message:"Data Updated Successful",success:"success",error:"Congratulations..."})
        })        
    } catch (error) {
        const categories = await Categories.find();
        res.status(201).render("editfloorPlan",{set:req.body,categories:categories,error:error})
    }
});
module.exports = floorplanRouter;
