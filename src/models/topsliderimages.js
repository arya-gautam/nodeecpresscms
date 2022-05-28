const mongoose = require("mongoose");

const topSliderImages = new mongoose.Schema({
        page_name:{
            type: [{ type:'ObjectId', ref: 'category' }],
            required:[true,"The page name field is required."]
        },
        page_title:{
            type:String,
            required:[true,"The title field is required."]
          
        },
        image:{
            type:String,
            required:[true,"The image field is required."]
   
        },
        created_at:{
            type:Date,
            default:Date(new Date())
        },
        updated_at:{
            type:Date,
            default:Date(new Date())
        }
})
const Topsliderimages = new mongoose.model("topsliderimage",topSliderImages);
module.exports = Topsliderimages;
