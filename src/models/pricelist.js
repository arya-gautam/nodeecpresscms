const mongoose = require("mongoose");

const pricelist = new mongoose.Schema({
    page_name:{
        type: [{ type:'ObjectId', ref: 'category' }],
        required : [true,"The page name field is required."]
    },
    page_section:{
        type:String,
        required:[true,"The page section field is required."]
    },
    typology :{
        type:String,
        required:[true,"The typology field is required."]
    },
    carpet_area :{
        type:String,
        required:[true,"The carpet area field is required."]
    },
    starting_price :{
        type:String,
        required:[true,"The Starting Price field is required."]
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

const Pricelist = new mongoose.model('pricelist',pricelist);
module.exports = Pricelist;