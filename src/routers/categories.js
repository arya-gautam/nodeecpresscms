const express = require("express");
const categoriesRouter = new express.Router();
const Categories = require("../models/categories");
const adminauth = require("../middleware/adminauth");

/*all categories show  page load*/
categoriesRouter.get("/admin/categories",adminauth,async(req,res)=>{
    const result = await Categories.find();
    res.status(201).render("categories",{result:result});
});
/* add categories page load*/
categoriesRouter.get("/admin/addCategories",adminauth,async(req,res)=>{
    res.status(201).render("addCategories");
});

/*categories data insert */
categoriesRouter.post("/admin/categories",adminauth,async(req,res)=>{
    try {
       const addcategories = new Categories({
        page_name : req.body.page_name,
        page_title : req.body.page_title,
        page_url : req.body.page_url,
        meta_keywords : req.body.meta_keywords,
        meta_description : req.body.meta_description,
        created_at : new Date(Date.now()),
        updated_at : new Date(Date.now())
        })
        const data = await addcategories.save();
        var result = await Categories.find();
         res.status(201).render("categories",{result:result,status:"success",title:"Congratulations...",message:"Categories Added Successfully"});
    } catch (error) {
        //console.log(error);
        //res.status(404).send(error);
        res.status(404).render("addCategories",{error,set:req.body});
    }
});
/*delete categories data  */
categoriesRouter.delete("/admin/categories/:id",(req,res)=>{
    const _id = req.params.id;
    Categories.findByIdAndDelete(_id)
    .then(result => {
        req.flash('message','Data Deleted Successfully');
        res.json({redirect:'/admin/categories'});
    }).catch(err => {
        res.status(404).send(err);
    })
})
/*page load of edit categories  */
categoriesRouter.get("/admin/categories/:id",adminauth,async(req,res)=>{
    try {
        const result = await Categories.findById(req.params.id);
        if(result){
            res.status(201).render("editCategories",{set:result}); 
        }
        else{
            res.status(404).render("404");
        }
       
    } catch (error) {
        res.status(404).send(error);
    }
});
/* data update of edit categories  page */
categoriesRouter.post("/admin/categories/:id",adminauth,async(req,res)=>{
    try {
        const _id = req.params.id;
        const updateCategories = await Categories.findByIdAndUpdate(_id,req.body,{new :true});
        var result = await Categories.find();
        res.status(201).render("categories",{result:result,status:"success",title:"Congratulations...",message:"Categories Update Successfully"});
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = categoriesRouter;
