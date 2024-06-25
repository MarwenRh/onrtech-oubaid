import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
  companyLogo: {
    type: String,
    required: true,
  },
  joinDate: {
    type: String,
    required: true,
  },
  joined: {
    type: Date,
    default: Date.now(),
  },
});

export const Client = mongoose.model("Client", clientSchema);
