import bcrypt from 'bcrypt'
import User from '../Models/registerSchema.js'
import express from 'express'


const router=express.Router();
router.post('/register',async (req, res)=>{
    try{
     const{username, email, password}=req.body;
     if(!username || !email || !password){
        return res.status(400).send("Field Missing")
     }

     const existingUser=await User.findOne({email})
     if(existingUser){ 
        return res.status(400).send({message: "User Already Exists"});
     }

     const user=new User({username, email, password});

     await user.save();

     res.status(201).send({message: "User Registered Successfully" });
}catch(err){
    res.status(500).send({message: "Server Error", error: err.message});
}
});

export default router