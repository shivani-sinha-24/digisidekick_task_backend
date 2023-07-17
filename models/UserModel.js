import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    image:{
        type:String,
    }
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const User = mongoose.model("User", userSchema);

export default User;