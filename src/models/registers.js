const mongoose = require("mongoose");
const  validator = require("validator");
/* Student registration validation shema */
const studentSchema = new mongoose.Schema({
    firstname :{
        type:String,
        required:[true,"The First Name Is Required."],
    },
    lastname:{
        type:String,
        required:[true,"The Last Name Is Required."],
    
    },
    email:{
        type:String,
        required:[true,"The Email Is Required."],
        unique:true,
        validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid Email");
        }
    }     
    },
    password:{
        type:String,
        required:[true,"The Password Is Required."],
    },
    confirmpassword:{
        type:String,
        required:[true,"The Confirm Password Is Required."],
    },
    phone:{
        type:Number,
        required:[true,"The Phone Is Required."],
        unique:true
    },
    address:{
        type:String,
        required:[true,"The Address Is Required."],
    }
})


/* Create Collection  and modeule export*/
const Register = new mongoose.model("Register",studentSchema);
module.exports = Register;