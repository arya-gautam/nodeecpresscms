const express = require("express");
/* chnage  route of specific aminities */
const photogalleryRouter = express.Router();
/*login auth middeleware */
const adminauth = require("../middleware/adminauth");
/*Photogallery model ini */
const Photogallery = require("../models/photogallery");
/*categories model ini */
const Categories = require("../models/categories");
/*multer ini for image uplaod */
const multer = require("multer");
/*path ini  */
const path = require("path");
/*load photo Galleries page*/
photogalleryRouter.get("/admin/photogalleries",async(req,res)=>{
    try {
        Photogallery.find({}).populate('page_name').exec((err,result)=>{
            if(err) throw(err)
            res.status(201).render("photogalleries",{result:result,message:req.flash('message'),status:req.flash('status'),error:req.flash('error')});
        })
        
    } catch (error) {
        res.status(404).send(error)
    }
});
/*load add photo Gallery page */
photogalleryRouter.get("/admin/addPhotogallery",adminauth,async(req,res)=>{
    try {
        const categories = await Categories.find();
        res.status(201).render("addPhotogallery",{categories:categories});
    } catch (error) {
        res.status(404).send(error)
    }
});
/*multer storage ini for image upload */
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../../public/uploads/photogalleries"))
    },filename:function(req,file,cb){
        const name = Date.now() + '-' + file.originalname;
        cb(null,name);
    }
});
const upload = multer({storage:storage});
/*insert data of photo gallery page */
photogalleryRouter.post("/admin/photogalleries",adminauth,upload.single('image'),async(req,res)=>{
    try {
       const photogallery = new Photogallery({
           page_name:req.body.page_name,
           page_section:req.body.page_section,
           image:req.file.filename,
           created_at:Date(new Date()),
           updated_at:Date(new Date())
       })
       const inserted = await photogallery.save();
       Photogallery.find({}).populate('page_name').exec((err,result)=>{
           if(err) throw(err)
           res.status(201).render("photogalleries",{result:result,message:"Data Added Successfully",status:"success",title:"Congratulations..."})
       })
    } catch (error) {
        const categories = await Categories.find();
        res.status(201).render("addPhotogallery",{set:req.body,categories:categories,error:error});
    }
    });

/*delete  Photogallery */
photogalleryRouter.delete("/admin/photogalleries/:id",(req,res)=>{
    const _id = req.params.id;
    Photogallery.findByIdAndDelete(_id)
    .then(result => {
        req.flash('message','Data Deleted Success');
        req.flash('error','success');
        req.flash('status','Floor Plans');
        res.json({redirect:'/admin/photogalleries'});
    })
    .catch(error => {console.log(error)});
});
/*load edit photo galleries  page */
photogalleryRouter.get("/admin/editPhotogallery/:id",adminauth,async(req,res)=>{
try {
const result = await Photogallery.findById(req.params.id);
if(result){
    const categories = await Categories.find();
    res.status(201).render("editPhotogallery",{set:result,categories:categories})
}else
{res.status(404).send({error:"404"});}

} catch (error) {
    res.status(404).send({error:error});
}
});
/*update data of Photogallery  page */
photogalleryRouter.post("/admin/photogalleries/:id",adminauth,upload.single('image'),async(req,res)=>{

    try {
       const _id = req.params.id;
        if(req.file)
        {
            const photogallery = ({
                page_name:req.body.page_name,
                page_section:req.body.page_section,
                image:req.file.filename,
                updated_at:Date(new Date())
            })
            const updated = await Photogallery.findByIdAndUpdate(_id,photogallery,{new : true});
        }else
        {
            const updated = await Photogallery.findByIdAndUpdate(_id,req.body,{new : true});
        }

        Photogallery.find({}).populate('page_name').exec((err,result)=>{
            if(err) throw(err)
            res.status(201).render("photogalleries",{result:result,message:"Data Updated Successful",success:"success",error:"Congratulations..."})
        })        
    } catch (error) {
        const categories = await Categories.find();
        res.status(404).render("editPhotogallery",{set:req.body,categories:categories,error:error})
    }
});
module.exports = photogalleryRouter;
