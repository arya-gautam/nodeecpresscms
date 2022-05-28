const express = require("express");
/* chnage  route of specific aminities */
const dynamicRouter = express.Router();
/*categories model ini */
const Categories = require("../models/categories");
/*topslider heading model ini*/
const Topsliderheadings = require("../models/topsliderheadings");
/*topslider images model ini*/
const TopsliderImages = require("../models/topsliderimages");
/*Overview model ini*/
const Overview = require("../models/overview");
/*amenities model ini */
const Amenities = require("../models/amenities");
/*floor plan model ini */
const Floorplan = require("../models/floorplan");
/*pricelist  model ini */
const Pricelist = require("../models/pricelist");
/*Photogallery model ini */
const Photogallery = require("../models/photogallery");


dynamicRouter.get("/:url",async(req,res)=>{
    try {
        page_url = req.params.url;
        categories  = await Categories.find();
        header  = await Categories.findOne({page_url:page_url});
        topsliderheading  = await Topsliderheadings.findOne({page_name:header._id});
        topsliderimages  = await TopsliderImages.find({page_name:header._id});
        overview = await Overview.findOne({page_name:header._id});
        amenities = await Amenities.find({page_name:header._id});
        floorplans = await Floorplan.find({page_name:header._id});
        pricelists = await Pricelist.find({page_name:header._id});
        photogallery = await Photogallery.find({page_name:header._id});
        //console.log({topsliderimages:topsliderimages});
     res.status(201).render("dynamic",{
         categories:categories,
         header:header,
         topsliderheading:topsliderheading,
         topsliderimages:topsliderimages,
         overview:overview,
         amenities:amenities,
         floorplans:floorplans,
         pricelists:pricelists,
         photogallery:photogallery});
    } catch (error) {
        res.status(404).send(error);
    } 
});



// dynamicRouter.get("/",async(req,res)=>{
//     try {
//         categories  = await Categories.find();
//         page_url = categories[0].page_url;
//         header  = await Categories.findOne({page_url:page_url});
//         topsliderheading  = await Topsliderheadings.findOne({page_name:header._id});
//         topsliderimages  = await TopsliderImages.find({page_name:header._id});
//         overview = await Overview.findOne({page_name:header._id});
//         amenities = await Amenities.find({page_name:header._id});
//         floorplans = await Floorplan.find({page_name:header._id});
//         pricelists = await Pricelist.find({page_name:header._id});
//         photogallery = await Photogallery.find({page_name:header._id});
//         res.status(201).render("dynamic",{
//          categories:categories,
//          header:header,
//          topsliderheading:topsliderheading,
//          topsliderimages:topsliderimages,
//          overview:overview,
//          amenities:amenities,
//          floorplans:floorplans,
//          pricelists:pricelists,
//          photogallery:photogallery});
//     } catch (error) {
//         res.status(404).send(error);
//     } 
// });


module.exports = dynamicRouter;

