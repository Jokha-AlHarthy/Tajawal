import mongoose from "mongoose";

const DestinationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    country: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true }
}, {
    timestamps: true,
    collection: "tajawal_destinations"
});

export default mongoose.model("TajawalDestination", DestinationSchema);
