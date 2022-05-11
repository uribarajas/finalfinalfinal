const mongoose = require("mongoose");
const config = require("./config")

const mongoDBUrl = config.getUrl();
console.log(mongoDBUrl);

mongoose.connect(mongoDBUrl, {
    useNewUrlParser:true
}).then(()=>{
    console.log("Connected to db");
}).catch((err)=>{
    console.log("Not connected", err);
})

module.exports={mongoose}