const mongoose = require("mongoose");
const mongoURI  = 'mongodb+srv://users:users@cluster0.vkr3a.mongodb.net/users?retryWrites=true&w=majority';

mongoose.connect(mongoURI ,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    // useUnifiedTopology:true,
    // useFindAndModify:false
}).then(()=>{
    console.log(`Connection Successful With Mongo DB`);
}).catch((error)=>{
    console.log(error);
});

