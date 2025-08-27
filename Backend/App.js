import express from 'express'
import cors from 'cors'
import mongoose, { Mongoose } from 'mongoose'
import dotenv from 'dotenv'


const app=express();

app.use(cors())
app.use(express.json());


app.get('/', (req, res)=>{
     res.send("Yeah it's working")
})

export default app