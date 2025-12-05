import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserModel from './models/UserModel.js';
import TripModel from "./models/TripModel.js";
import bcrypt from 'bcrypt';
import multer from "multer";
import crypto from "crypto";
import nodemailer from "nodemailer";


let app = express();
app.use(cors());
app.use(express.json());


const conStr = "mongodb+srv://admin:tajawal12345@cluster0.52ofhmy.mongodb.net/tajawaldb?appName=Cluster0";

mongoose.connect(conStr)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB error:", err));

//Login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Please enter email and password" });

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const passValid = await bcrypt.compare(password, user.password);
    if (!passValid)
      return res.status(401).json({ message: "Invalid email or password" });

    return res.status(200).json({ message: "Login Successfully", user });
  }
  catch (error) {
    res.send(error);
  }
});


//Registration API
app.post("/register", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user)
      return res.status(500).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      phone: req.body.phone,
      password: hashedPassword
    });

    await newUser.save();
    res.send({ message: "User Registered.." });

  } catch (error) {
    res.send(error);
  }
});


//Forget Password API
app.post("/forgotPassword", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(200).json({
        message: "If the email exists, a reset link will be sent."
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    const resetURL = `http://localhost:3000/reset-password/${token}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "teamtajawal@gmail.com",
        pass: "asbbqpalumordfur"
      }
    });
    transporter.verify((err, success) => {
      if (err) {
        console.log("SMTP ERROR:", err);
      } else {
        console.log("SMTP SERVER IS READY");
      }
    });

    await transporter.sendMail({
      from: "teamtajawal@gmail.com",
      to: email,
      subject: "Reset your Tajawal password",
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetURL}" target="_blank">${resetURL}</a>
        <p>This link expires in 1 hour.</p>
      `
    });
    res.status(200).json({
      message: "Reset link sent to your email",
      resetLink: resetURL
    });

  } catch (error) {
    res.status(500).json({ message: "Error sending reset email", error });
  }
});


//User profile API
const upload = multer({ storage: multer.memoryStorage() });
app.put("/user/update/:id", upload.single("profilePic"), async (req, res) => {
  try {
    const uid = req.params.id;
    const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      airport: req.body.airport,
      budget: Number(req.body.budget)
    };
    if (req.body.dateOfBirth) {
      updateData.dateOfBirth = new Date(req.body.dateOfBirth);
    }
    if (req.file) {
      updateData.profilePic = req.file.buffer;
    }
    const updatedUser = await UserModel.findByIdAndUpdate(uid, updateData, {
      new: true,
    });
    res.json({ message: "Updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Update failed", error });
  }
});



// Adding Trip API
app.post("/planTrip", async (req, res) => {
  try {
    const trip = new TripModel({
      userId: req.body.userId,
      destination: req.body.destination,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      budget: req.body.budget,
      travelers: req.body.travelers,
      interests: req.body.interests,
    });

    await trip.save();
    res.status(200).json({ message: "Trip saved", trip });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//rest password
app.post("/resetPassword/:token", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashed = await bcrypt.hash(req.body.password, 10);
    user.password = hashed;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
});

app.listen(8080, () => {
  console.log("Tajawal backend is live on port 8080..");
});
