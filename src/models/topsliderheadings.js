const mongoose = require("mongoose");

const topSliderHeadings = new mongoose.Schema({
        page_name:{
            type: [{ type:'ObjectId', ref: 'category' }],
            required:[true,"The page name field is required."],
            unique:true
        },
        heading:{
            type:String,
            required:[true,"The heading field is required."]
          
        },
        rera_number:{
            type:String,
            required:[true,"The rera number field is required."]
   
        },
        land_area :{
            type:String,
            required:[true,"The land area  field is required."]
        },
        total_floors:{
            type:String,
            required:[true,"The total floors towers field is required."]
        },
        total_towers:{
            type:String,
            required:[true,"The meta total towers field is required."]
        },
        total_units:{
            type:String,
            required:[true,"The total units field is required."]
        },
        configuration:{
            type:String,
            required:[true,"The configuration field is required."]
        },
        size_range:{
            type:String,
            required:[true,"The size range field is required."]
        },
        status:{
            type:String,
            required:[true,"The status field is required."]
        },
        starting_price:{
            type:String,
            required:[true,"The starting price field is required."]
        },
        created_at:{
            type:Date,
            default:Date(new Date())
        },
        updated_at:{
            type:Date,
            default:Date(new Date())
        },
        page_title:
        {
            type:String
        }
})


const Topsliderheadings = new mongoose.model("topsliderheading",topSliderHeadings);
module.exports = Topsliderheadings;
