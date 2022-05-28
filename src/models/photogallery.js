const mongoose = require("mongoose");

const photogallery = new mongoose.Schema({
    page_name:{
        type: [{ type:'ObjectId', ref: 'category' }],
        required : [true,"The page name field is required."]
    },
    page_section:{
        type:String,
        required:[true,"The page section field is required."]
    },
    image:{
        type:String,
        required:[true,"The image field is required."]
    },
    created_at:{
        type:Date,
        default:Date(new Date)
    },
    updated_at:{
        type:Date,
        default:Date(new Date)
    }
});

const Photogallery = new mongoose.model('photogallery',photogallery);
module.exports = Photogallery;