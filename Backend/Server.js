import dotenv from 'dotenv'
import app from './App.js'
import mongoose from 'mongoose'

dotenv.config();

const port=process.env.PORT || 5000
const mongo_uri=process.env.MONGO_URI

mongoose.connect(mongo_uri, {

})

.then(()=>{
    console.log("MongoDB Connected");


app.listen(port, ()=>{
    console.log(`Yes, server is running on ${port}`);
});
})

.catch(error=>{
       console.error("DB Connection error: ", error)
})
