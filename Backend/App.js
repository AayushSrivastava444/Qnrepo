import express from 'express'
import cors from 'cors'
import mongoose, { Mongoose } from 'mongoose'
import registerRouter from './Verfication/Register.js'
import loginRouter from './Verfication/Login.js'


const app=express();

app.use(cors())
app.use(express.json());

app.use('/api', registerRouter)
app.use('/api', loginRouter)

app.get('/', (req, res)=>{
     res.send("Yeah it's working")
})

export default app