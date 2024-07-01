import { Client } from "../models/Client.js";
import cloudinary from "../utils/cloudinaryConfig.js";
import fs from "fs";
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    res.status(200).send({ count: clients.length, Clients: clients });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: error.message });
  }
};
export const createClient = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "You have to put an image." });
    }
    if (!req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({ error: "Only pdf are allowed." });
    }
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(req.file.path);
    // Delete temporary file from server
    fs.unlinkSync(req.file.path);
    // Parse the published field back to a boolean

    // Create a new client object
    const newClient = new Client({
      companyLogo: result.secure_url,
      clientName: req.body.clientName,
      description: req.body.description,
      joinDate: req.body.joinDate,
    });
    // Save the new client to the database
    const client = await Client.create(newClient);

    // Send back the created client as a response
    return res.status(201).send(client);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: error.message });
  }
};
export const deleteClientById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      return res.status(404).send({ msg: "Client Not found" });
    } else {
      return res.status(200).send({ msg: "deleted succefully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error.message });
  }
};
