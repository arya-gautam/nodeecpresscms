const mongoose = require("mongoose");

const amenities = new mongoose.Schema({
    page_name:{
        type: [{ type:'ObjectId', ref: 'category' }],
        required : [true,"The page name field is required."]
    },
    heading:{
        type:String,
        required:[true,"The heading field is required."]
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

const Amenities = new mongoose.model('amenity',amenities);
module.exports = Amenities;