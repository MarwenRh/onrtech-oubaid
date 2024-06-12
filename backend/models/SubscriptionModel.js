import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Subscription = mongoose.model("Subscription", SubscriptionSchema);
