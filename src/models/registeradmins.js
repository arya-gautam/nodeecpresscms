const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
    name:{
        type : String,
        required:[true,"The Name Is Required."]
    },
    email :{
        type:String,
        required:[true,"The Email Is Required."],
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid Email");
            }
        }
    },
    password:{
        type:String,
        required:[true,"The Password Is Required."]
    },
    confirmpassword:{
        type:String,
        required:[true,"The Confirm Password Is Required."]
    },
    created_at:{
        type:Date
    },
    updated_at:{
        type:Date
    },
    verifylink:{
        type:String
    },
    isVerified: { type: Boolean, default: false },
    tokens :[{
        token:{
            type:String,
            required:true
        }
    }]

})


/*generate token*/
adminSchema.methods.geterateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
         await this.save();
         return token;
         console.log(`token id ${token}`);
    }catch(error){
       // res.send(`error id ${error}`);
        console.log(`error id ${error}`);
    }
}


/*admin password hasing */
adminSchema.pre("save",async function(next){
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10);
    this.confirmpassword = await bcrypt.hash(this.confirmpassword,10);
    }
    next();
})





const adminRegister = new mongoose.model("admin",adminSchema);
module.exports = adminRegister;
