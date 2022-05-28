const express = require("express");
const topsliderheadingRouter = new express.Router();
const Topsliderheadings = require("../models/topsliderheadings");
const Categories = require("../models/categories");
const adminauth = require("../middleware/adminauth");

/*Load topSliderImages page */
topsliderheadingRouter.get("/admin/topSliderHeadings",adminauth,(req,res)=>{
    Topsliderheadings.find({}).populate('page_name').exec((err,result)=>{
        if(err) throw(err);
        //res.status(201).send({result:result});
       res.status(201).render("topSliderHeadings",{result:result});
    })
});
/*Load add top slider heading */
topsliderheadingRouter.get("/admin/addTopSliderHeading",adminauth,async(req,res)=>{
    const categories = await Categories.find();
    res.status(201).render("addTopSliderHeading",{categories:categories});
});
/*insert top slider headings */
topsliderheadingRouter.post("/admin/topSliderHeadings",adminauth,async(req,res)=>{
    try {
       const topsliderheading = new Topsliderheadings({
        page_name:req.body.page_name,
        page_title:req.body.page_title,
        heading:req.body.heading,
        rera_number:req.body.rera_number,
        land_area:req.body.land_area,
        total_floors:req.body.total_floors,
        total_towers:req.body.total_towers,
        total_units:req.body.total_units,
        configuration:req.body.configuration,
        size_range:req.body.size_range,
        status:req.body.status,
        starting_price:req.body.starting_price,
       })

     const inserted = await topsliderheading.save();
     Topsliderheadings.find({}).populate('page_name').exec((err,result)=>{
        if(err) throw(err);
         
        res.status(201).render("topSliderHeadings",{result:result});
    })
        
    } catch (error) {
        const categories = await Categories.find();
        res.status(404).render("addTopSliderHeading",{error,set:req.body,categories:categories});
    }
});

/*delete top slider heading data  */
topsliderheadingRouter.delete("/admin/topSliderHeadings/:id",(req,res)=>{
    const _id = req.params.id;
    Topsliderheadings.findByIdAndDelete(_id)
    .then(result => {
        req.flash('message','Data Deleted Success');
        req.flash('error','success');
        req.flash('status','Category');
        res.json({redirect:'/admin/topSliderHeadings'});
    }).catch(err => {
        res.status(404).send(err);
    })
})
/*page load of edit top slider heading */
topsliderheadingRouter.get("/admin/editTopSliderHeading/:id",adminauth,async(req,res)=>{
    try {
        const result = await Topsliderheadings.findById(req.params.id);
        if(result)
        {
            const categories = await Categories.find();
            //res.send({set:result,page_name_id:result.page_name[0],categories:categories});
            res.status(201).render("editTopSliderHeading",{set:result,id:result.page_name[0],categories:categories});
        }
        else
        {res.status(404).render("404");}
    } catch (error) {
        res.status(404).send(error);
    }
});
/* data update of top slider heading  page */
topsliderheadingRouter.post("/admin/topSliderHeadings/:id",adminauth,async(req,res)=>{
    try {
        const _id = req.params.id;
        const updateTopSliderHeading = await Topsliderheadings.findByIdAndUpdate(_id,req.body,{new :true});
        Topsliderheadings.find({}).populate('page_name').exec((err,result)=>{
            if(err) throw(err);
            res.status(201).render("topSliderHeadings",{result:result,status:"success",title:"Congratulations...",message:"Data Update Successfully"});
        })
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = topsliderheadingRouter;