import { Application } from "../models/ApplicationModel.js";
import { User } from "../models/userModel.js";
import { Job } from "../models/JobModel.js";
import cloudinary from "../utils/cloudinaryConfig.js";

import fs from "fs";
import sendEmail from "../utils/SendEmail.js";

// Apply for a job
export const applyForJob = async (req, res) => {
  const { applicantName, applicantEmail, offerTitle, applicantId, offerId } =
    req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Please upload your resume." });
  }

  if (req.file.mimetype !== "application/pdf") {
    return res.status(400).json({ message: "Please upload a PDF file." });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
    });

    fs.unlinkSync(req.file.path);

    const resumeUrl = result.secure_url;

    // Create new application
    const newApplication = new Application({
      applicantId,
      offerId,
      applicantName,
      applicantEmail,
      resume: resumeUrl,
      offerTitle,
      published: false,
    });

    await newApplication.save();

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error uploading Resume:", error);
    res.status(500).json({ message: "Failed to submit application." });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Failed to fetch applications." });
  }
};

export const deleteApplication = async (req, res) => {
  const id = req.params.id;

  try {
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    const applicant = await User.findById(application.applicantId);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found." });
    }

    const offer = await Job.findById(application.offerId);
    if (!offer) {
      return res.status(404).json({ message: "Job offer not found." });
    }

    await Application.findByIdAndDelete(id);

    res.status(200).json({ message: "Application deleted successfully." });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Delete failed." });
  }
};
// reject app
export const rejectApplication = async (req, res) => {
  const id = req.params.id;

  try {
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    const applicant = await User.findById(application.applicantId);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found." });
    }

    const offer = await Job.findById(application.offerId);
    if (!offer) {
      return res.status(404).json({ message: "Job offer not found." });
    }

    const subject = `Update on Your Application for ${offer.title}`;
    const send_to = applicant.email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = "noreply@onrtech.com";
    const template = "rejectMail";
    const name = applicant.name;
    const link = "/";

    // Send email notification
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );

    req.body.state = "rejected";
    await Application.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "Application have been rejected." });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "rejected failed." });
  }
};
export const acceptApplication = async (req, res) => {
  const id = req.params.id;

  try {
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    const applicant = await User.findById(application.applicantId);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found." });
    }

    const offer = await Job.findById(application.offerId);
    if (!offer) {
      return res.status(404).json({ message: "Job offer not found." });
    }

    const subject = `Your Application for ${offer.title} Has Been Accepted! 🎉`;
    const send_to = applicant.email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = "noreply@onrtech.com";
    const template = "acceptMail";
    const name = applicant.name;
    const link = "/";

    // Send email notification
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    req.body.state = "accepted";
    await Application.findByIdAndUpdate(id, req.body);

    res.status(200).json({ message: "Application accepted successfully." });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "acceptance failed failed." });
  }
};
