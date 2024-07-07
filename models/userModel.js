import mongoose, { Schema, mongo } from "mongoose";

const userSchema =  new mongoose.Schema({
 url:{type:String},
 type:String,
 name:String,
 password:String,
 cart:[{type:Schema.Types.ObjectId,ref:'Food'}]
});

const userModel = mongoose.model('cartdata',userSchema);
export default userModel;