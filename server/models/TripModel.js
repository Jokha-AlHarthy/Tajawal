import mongoose from "mongoose";

const TripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  destination: { type: String, required: true },
  startDate: { type: String, required: true },  
  endDate: { type: String, required: true },    
  budget: { type: Number, required: true },
  travelers: { type: Number, required: true },
  interests: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  destination: { type: String, required: true }

});

export default mongoose.model("Trips", TripSchema);
