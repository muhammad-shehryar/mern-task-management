const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register",async(req,res)=>{
    try{
        const {username,password}=req.body;
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({username,password:hashedPassword})
        res.status(201).json(user)
    }catch(error){
        res.status(500).json({message:"Error creating user"})
    }
})

router.post("/login",async(req,res)=>{
    const {username,password}=req.body

    const user = await User.findOne({email})

    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(401).json({message:"Invalid Credentials"})
    }

    const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:"1h"})
    res.json({token})
})

module.exports = router;