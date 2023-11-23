const express=require("express")
const cors=require("cors")
const { json } = require("express")
const { default: mongoose } = require("mongoose")
const usersModel = require("./Model/usersModel")
const jsonwebtoken=require("jsonwebtoken")


const app=express()
const PORT=2525
app.use(cors())
app.use(json())
mongoose.set('strictQuery', false)

mongoose.connect("mongodb://127.0.0.1:27017/AuthDB")
.then(()=>console.log("DB is connected!!!"))

app.get("/getotp",(req,res)=>{
    const otp=Math.floor(100000+Math.random()*900000)
    res.json({otp})
})


app.get("/",(req,res)=>{
    res.send("Welcome to Auth Api")
})

app.post("/adduser",(req,res)=>{
    const {name,username,password,email,phone}=req.body
    const payload={
        name,
        username,
        password,                         //sending data to database
        email,
        phone
    }
    const newUser= new usersModel(payload)
    newUser.save()
    res.send("Sucessfully registered the user")
})

app.post("/login", async(req,res)=>{
    const payload=req.body
    const {email}=req.body
    const result= await usersModel.find(payload)
    if(result.length>0){
        const token =jsonwebtoken.sign({email},"logintoken")
    const msg="ok"
    res.json({token,msg})
    }else{
        res.json({msg:"Invalid login credentials"})
    }
})

app.listen(PORT,()=>{
    console.log("Server is Running on port:"+PORT);
})