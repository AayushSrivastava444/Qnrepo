import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../Models/registerSchema.js'
import express from 'express'

const router=express.Router();

router.post('/login', async(req, res)=>{
     try {
        const {email, password}=req.body
        if(!email || !password){
             return res.status(400).send({message: "Empty Fields"});
        }

        const user= await User.findOne({email});
        if(!user){
            return res.status(400).send({message: "Email does not exist"});
        }

        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch){ 
            return res.status(400).send({message: "Wrong Password"});
}

        const token= jwt.sign({id:user._id}, 'your_secret_key', {expiresIn: '1d'});
        res.json({token, message:"Login Successfull"});
     } catch (err) {
        res.status(400).send({message: "Server Error", error: err.message});
     }
});

export default router