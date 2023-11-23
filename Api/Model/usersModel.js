const   mongoose  = require("mongoose")

const usersModel=mongoose.model("users",{
    name:{type:String},
    username:{type:String},
    email:{type:String},
    phone:{type:String},
    password:{type:String}
})


module.exports=usersModel