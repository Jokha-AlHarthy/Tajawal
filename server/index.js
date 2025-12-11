import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserModel from './models/UserModel.js';
import TripModel from "./models/TripModel.js";
import DestinationModel from "./models/DestinationModel.js";
import Notification from './models/Notification.js';
import AdminModel from "./models/AdminModel.js";
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

//Login API - user & admin
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

app.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const passValid = await bcrypt.compare(password, admin.password);
    if (!passValid) return res.status(401).json({ message: "Invalid credentials" });

    return res.status(200).json({ message: "Admin login success", admin });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Registration API (User + Admin)
app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, dateOfBirth, phone, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingUser || existingAdmin) {
      return res.status(400).json({ message: "Account with this email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const adminEmails = ["teamtajawal@gmail.com"]; 
    if (adminEmails.includes(email)) {
      const newAdmin = new AdminModel({
        firstName,
        lastName,
        email,
        dateOfBirth,
        phone,
        password: hashedPassword,
      });
      await newAdmin.save();
      return res.status(200).json({ message: "Admin registered successfully", role: "admin" });
    }
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      dateOfBirth,
      phone,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully", role: "user" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
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
    await Notification.create({
      userId: uid,
      title: "Profile Updated",
      message: "Your profile changes were saved successfully.",
    });
    res.json({ message: "Updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Update failed", error });
  }
});


// Adding Trip API
app.post("/planTrip", async (req, res) => {
  const trip = new TripModel({
    userId: req.body.userId,
    destination: req.body.destination,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    budget: req.body.budget,
    travelers: req.body.travelers,
    interests: req.body.interests,
    lat: req.body.lat,   
    lng: req.body.lng   
  });
  await trip.save();
  res.status(200).json({ message: "Trip saved", trip });
});




//Rest password API
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

//User Feedback
app.post("/user/feedback", async (req, res) => {
  try {
    const { userId, rating, category, comments } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.feedback.push({ rating, category, comments });
    await user.save();

    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback", error });
  }
});

// Add new notification
app.post("/notifications/add", async (req, res) => {
  try {
    const newNote = await Notification.create(req.body);
    res.json(newNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to add notification" });
  }
});

// Get all notifications for a user
app.get("/notifications/user/:userId", async (req, res) => {
  try {
    const notes = await Notification.find({ userId: req.params.userId })
      .sort({ time: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// Mark notification as read
app.put("/notifications/read/:id", async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to mark as read" });
  }
});

// Delete notification
app.delete("/notifications/delete/:id", async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete notification" });
  }
});


// Get all trips for a user
app.get("/trips/user/:userId", async (req, res) => {
  try {
    const trips = await TripModel.find({ userId: req.params.userId }).sort({ startDate: 1 });
    if (!trips || trips.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(trips);
  } catch (err) {
    console.error("Error fetching trips:", err);
    res.status(500).json({ message: "Failed to fetch trips" });
  }
});


//Admin Profile - reading API
app.get("/admin/profile/:email", async (req, res) => {
    const admin = await AdminModel.findOne({ email: req.params.email });
    res.send(admin);
});


//Admin profile - updating API
app.put("/admin/profile/update", upload.single("profilePic"), async (req, res) => {
    try {
        const admin = await AdminModel.findOne({ email: req.body.email });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        admin.firstName = req.body.firstName;
        admin.lastName = req.body.lastName;
        admin.dateOfBirth = req.body.dateOfBirth;
        admin.phone = req.body.phone;
        if (req.file) admin.profilePic = req.file.buffer; 
        await admin.save();

        res.status(200).json({ admin, message: "Success" });
    } catch (err) {
        res.status(500).json({ message: "server error", error: err });
    }
});

//Reading the user by amdin
app.get("/admin/users", async (req, res) => {
    const users = await UserModel.find({});
    res.send(users);
});

//Reading the user by amdin
app.get("/admin/user/:email", async (req, res) => {
    const user = await UserModel.findOne({ email: req.params.email });
    res.send(user);
});

//Updating the user by amdin
app.put("/admin/user/update", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        user.uname = req.body.uname;
        user.phone = req.body.phone;
        user.dob = req.body.dob;
        user.profilepic = req.body.profilepic;

        await user.save();
        res.status(200).json({ user, message: "Success" });

    } catch (err) {
        res.status(500).json({ message: "server error" });
    }
});


//Deleting the user - By admin
app.delete("/admin/user/delete/:email", async (req, res) => {
    const user = await UserModel.findOneAndDelete({ email: req.params.email });
    res.status(200).json({ user, message: "Success" });
});


//Reading the destinations
app.get("/admin/destinations", async (req, res) => {
    const dest = await DestinationModel.find({});
    res.send(dest);
});

//adding the destination by the admin
app.post("/admin/destination/add", async (req, res) => {
    const newDest = new DestinationModel({
        title: req.body.title,
        country: req.body.country,
        category: req.body.category,
        image: req.body.image
    });

    await newDest.save();
    res.status(200).json({ message: "Success" });
});

//update destination
app.put("/admin/destination/update", async (req, res) => {
    const dest = await DestinationModel.findOne({ _id: req.body._id });

    dest.title = req.body.title;
    dest.country = req.body.country;
    dest.category = req.body.category;
    dest.image = req.body.image;

    await dest.save();
    res.status(200).json({ destination: dest, message: "Success" });
});

//delete destination
app.delete("/admin/destination/delete/:id", async (req, res) => {
    const dest = await DestinationModel.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ destination: dest, message: "Success" });
});

// Delete one trip
app.delete("/trip/delete/:id", async (req, res) => {
  try {
    const deleted = await TripModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete trip" });
  }
});

//Update the activity
app.put("/trip/updateActivities/:id", async (req, res) => {
  try {
    const updated = await TripModel.findByIdAndUpdate(
      req.params.id,
      { activities: req.body.activities },
      { new: true }
    );

    res.status(200).json({ message: "Itinerary updated", trip: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update itinerary" });
  }
});

//Read Uesr trip
app.get("/trip/:id", async (req, res) => {
  try {
    const trip = await TripModel.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.status(200).json({ trip });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trip" });
  }
});


app.listen(8080, () => {
  console.log("Tajawal backend is live on port 8080..");
});
