const mongoose = require("mongoose");

const pageCategories = new mongoose.Schema({
        page_name:{
            type:String,
            required:[true,"The page name field is required."],
            unique:true
        },
        page_title:{
            type:String,
            required:[true,"The page title field is required."]
          
        },
        page_url:{
            type:String,
            required:[true,"The page url field is required."],
            unique:true
   
        },
        meta_keywords :{
            type:String,
            required:[true,"The meta keywords  field is required."]
        },
        meta_description:{
            type:String,
            required:[true,"The meta description field is required."]
        },
        created_at:{
            type:Date
        },
        updated_at:{
            type:Date
        }
})


const Categories = new mongoose.model("category",pageCategories);
module.exports = Categories;
