const mongoose = require("mongoose");

//const mongoURI  = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vkr3a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const mongoURI = `mongodb://127.0.0.1:27017/cms`;
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

