import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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
            validator.isEmail(value)
        },
        messsage: "Please provide a valid email address"
    }
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
        this.password=await bycrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

