import { Form } from "../models/ContactFormModel.js";

export const getForm = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json({ count: forms.length, forms: forms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to handle POST request for creating a new form
export const postForm = async (req, res) => {
  try {
    const form = await Form.create(req.body);
    res.status(201).json(form);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to handle DELETE request for deleting a form
export const deleteForm = async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (!form) {
      res.status(404).send({ msg: "Not found" });
    }
    res.status(200).send(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
