import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: Buffer },
});

const AdminModel = mongoose.model("Admins", AdminSchema, "Admins");
export default AdminModel;


