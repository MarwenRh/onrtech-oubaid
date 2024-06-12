import mongoose, { model } from "mongoose";
const contactFormSchema = mongoose.Schema({
  name: String,
  email: String,
  reason: String,
  notes: String,
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});
export const Form = mongoose.model("Form", contactFormSchema);
