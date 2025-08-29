import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const regSchema =new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true,
        trim: true,
        minlength:5,
        maxlength:30
    },

    email:{
        type: String,
        required:true,
        unique:true,
        trim: true,
        lowercase: true,
        validate: {
        validator: function(value){
            return validator.isEmail(value)
        },
        message: "Please provide a valid email address"
    },
    },

    password:{
        type: String,
        required: true,
        minlength:8,

    },
},
{
    timestamps: true,
});

regSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    try {
        const salt= await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

const User= mongoose.model("User", regSchema)
export default User

