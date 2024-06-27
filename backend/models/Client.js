import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
  companyLogo: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  joinDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

export const Client = mongoose.model("Client", clientSchema);
