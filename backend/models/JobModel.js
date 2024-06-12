import mongoose from "mongoose";

const contractTypeOptions = [
  "Full Time",
  "Part Time",
  "Contract Work",
  "Freelancing",
  "Internship",
];
const locationTypeOptions = ["On-Site", "Remote", "Hybrid"];
const locationPlaceOptions = ["France", "Remote"];
const incomeCurrencyOptions = ["USD", "EUR", "GBP"];
const incomePeriodOptions = [
  "Monthly",
  "Weekly",
  "Bi-weekly (Fortnightly)",
  "Quarterly",
  "Annually",
  "Custom Period",
  "Per Pay Period",
  "Daily",
  "Per Project/Job",
  "Other (Specify)",
];
const contractDurationOptions = [
  "1 Month",
  "3 Months",
  "6 Months",
  "1 Year",
  "2 Years",
  "3 Years",
  "Indefinite",
  "Custom Duration",
  "Per Project/Job",
  "Other ",
];

const JobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    title: String,
    description: String,
    benefits: String,
    targetProfile: String,
    requiredQualification: String,
    optionalQualification: String,
    yearsOfExperienceRequired: Number,
    yearsOfExperienceRecommanded: Number,
    locationType: {
      type: String,
      enum: locationTypeOptions,
    },
    locationPlace: {
      type: String,
      enum: locationPlaceOptions,
    },
    contractType: {
      type: String,
      enum: contractTypeOptions,
    },
    contractDuration: {
      type: String,
      enum: contractDurationOptions,
    },
    incomePeriod: {
      type: String,
      enum: incomePeriodOptions,
    },
    incomeValue: Number,
    incomeCurrency: {
      type: String,
      enum: incomeCurrencyOptions,
    },

    published: {
      required: true,
      type: Boolean,
      default: false,
    },
    author: String,
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
// Middleware to set publishedAt when published is set to true
// JobSchema.pre("save", function (next) {
//   if (this.isModified("published") && this.published) {
//     this.publishedAt = new Date();
//   } else {
//     this.publishedAt = new Date("2002-06-04");
//   }
//   next();
// });
export const Job = mongoose.model("Job", JobSchema);
