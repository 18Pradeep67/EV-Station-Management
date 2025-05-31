import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required : true,
        unique : true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  adminAcess: {
    type:Boolean,
    default : false,
  }
}, { timestamps: true })

const User = mongoose.model('Userdetail',userSchema)

export default User;