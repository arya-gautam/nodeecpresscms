const express = require("express");
/* chnage  route of specific aminities */
const pricelistRouter = express.Router();
/*login auth middeleware */
const adminauth = require("../middleware/adminauth");
/*fplan model ini */
const Pricelist = require("../models/pricelist");
/*categories model ini */
const Categories = require("../models/categories");
/*path ini  */
const path = require("path");

/*load floor plan page*/
pricelistRouter.get("/admin/priceLists",async(req,res)=>{
    try {
        Pricelist.find({}).populate('page_name').exec((err,result)=>{
            if(err) throw(err)
            res.status(201).render("pricelists",{result:result,message:req.flash('message'),status:req.flash('status'),error:req.flash('error')});
        })
        
    } catch (error) {
        res.status(404).send(error)
    }
});
/*load add price list page */
pricelistRouter.get("/admin/addPricelist",adminauth,async(req,res)=>{
    try {
        const categories = await Categories.find();
        res.status(201).render("addPricelist",{categories:categories});
    } catch (error) {
        res.status(404).send(error)
    }
});

/*insert data of price list page */
pricelistRouter.post("/admin/priceLists",adminauth,async(req,res)=>{
    try {
       const pricelist = new Pricelist({
           page_name:req.body.page_name,
           page_section:req.body.page_section,
           typology:req.body.typology,
           carpet_area:req.body.carpet_area,
           starting_price:req.body.starting_price,
           created_at:Date(new Date()),
           updated_at:Date(new Date())
       })
       const inserted = await pricelist.save();
       Pricelist.find({}).populate('page_name').exec((err,result)=>{
           if(err) throw(err)
           res.status(201).render("pricelists",{result:result,message:"Data Added Successfully",status:"success",title:"Congratulations..."})
       })
    } catch (error) {
        const categories = await Categories.find();
        //res.status(201).send({set:req.body,categories:categories,error});
        res.status(201).render("addPricelist",{set:req.body,categories:categories,error:error});
    }
    });
    /*delete price list */
    pricelistRouter.delete("/admin/priceLists/:id",(req,res)=>{
    const _id = req.params.id;
    Pricelist.findByIdAndDelete(_id)
    .then(result => {
        req.flash('message','Data Deleted Success');
        req.flash('error','success');
        req.flash('status','Floor Plans');
        res.json({redirect:'/admin/priceLists'});
    })
    .catch(error => {console.log(error)});
});
/*load edit pricelist page */
pricelistRouter.get("/admin/editPriceList/:id",adminauth,async(req,res)=>{
    try {
    const result = await Pricelist.findById(req.params.id);
    if(result){
        const categories = await Categories.find();
        res.status(201).render("editPriceList",{set:result,categories:categories})
    }else
    {res.status(404).send({error:"404"});}
    
    } catch (error) {
        res.status(404).send({error:error});
    }
    });
    /*update data of floor plans page */
    pricelistRouter.post("/admin/priceLists/:id",adminauth,async(req,res)=>{
        try {
           const _id = req.params.id;
             const updated = await Pricelist.findByIdAndUpdate(_id,req.body,{new : true});
            Pricelist.find({}).populate('page_name').exec((err,result)=>{
                if(err) throw(err)
                res.status(201).render("pricelists",{result:result,message:"Data Updated Successful",success:"success",error:"Congratulations..."})
            })        
        } catch (error) {
            const categories = await Categories.find();
            res.status(404).render("pricelists",{set:req.body,categories:categories,error:error})
        }
    });



module.exports = pricelistRouter;
