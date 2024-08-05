const ContactData = require("../models/ContactUs");
const getObjectKeys = require("../utils/getObjKeys")
exports.createContact = async (req, res) => {
  try {
    const response = await ContactData.create(req.body);
    res.status(201).json({ success: true, data: response });
  } catch (error) {
const information = getObjectKeys(error)
    res
      .status(400)
      .json({ success: false, messsage:  ` ${information.path} (${information.message})`  || "Invalid input data" });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const response = await ContactData.find();
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while retrieving contacts",
    });
  }
};

exports.getByEmail = async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, error: "Email parameter is required" });
  }

  try {
    const response = await ContactData.findOne({ email });
    if (response) {
      res.status(200).json({ success: true, data: response });
    } else {
      res.status(404).json({
        success: false,
        message: "The requested email ID does not exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while retrieving the contact",
    });
  }
};
