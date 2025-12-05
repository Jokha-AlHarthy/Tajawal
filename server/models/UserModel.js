import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    firstName : {type:String, required: true},
    lastName : {type:String, required: true},
    email : {type:String, required: true, unique: true},
    dateOfBirth : {type:Date, required: true},
    phone : {type:String, required: true},
    password : {type:String, required: true},
    budget: { type: Number, default: 0 },
    airport: { type: String, default: "" },
    profilePic: { type: Buffer, default: null },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },

});

const UserModel=mongoose.model("Users",UserSchema,"Users");
export default UserModel;