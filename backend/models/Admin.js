const mongoose = require('mongoose');
const AdminSchema=mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    phonenumber:{
        type:Number,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    passkey:{
        type:String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    },
    isEmailVerified:{
        type:Boolean, 
        default:false
    }
});

const Admin = mongoose.model('admin',AdminSchema);
module.exports = Admin;