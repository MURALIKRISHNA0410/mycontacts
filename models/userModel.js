const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true ,"please add user name"],
    },
    email:{
        type:String,
        required :[true,"please add the email id"],
        unique:[true,"email address already taken"],
    },
    password:{
        type:String,
        required:[true,"please add the user password"],
    },
},{
    timestamp:true,
});

module.exports =mongoose.model("User",userSchema);