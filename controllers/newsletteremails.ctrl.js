const NewsletterEmails = require("../models/NewslettersEmail");
const getObjectKeys = require("../utils/getObjKeys");
exports.saveEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const emailExists = await NewsletterEmails.findOne({ email: email });
    if (emailExists) {
      res.status(400).json({
        success: false,
        message: "The provided email address already exists.",
      });
    } else {
      const response = await NewsletterEmails.create({ email: email });
      res.status(200).json({
        success: true,
        data: response,
      });
    }
  } catch (error) {
    const information = getObjectKeys(error);
    res.status(400).json({
      success: false,
      messsage:
        ` ${information.path} (${information.message})` || "Invalid input data",
    });
  }
};

exports.getEmails = async (req, res) => {
  try {
    response = await NewsletterEmails.find();
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.send({ success: false, message: "Data not found" });
  }
};

exports.deleteEmail = async (req, res) => {
  try {
    const response = await NewsletterEmails.deleteOne({
      email: req.params.email,
    });
    res.status(200).json({ success: true, data: "Item deleted" });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Couldn't delete the data." });
  }
};