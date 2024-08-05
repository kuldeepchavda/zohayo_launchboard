const getImageDownloadURL = require("../utils/uploadImage");
const Experience = require("../models/Experience");
const getObjKeys = require("../utils/getObjKeys");

exports.createExperience = async (req, res) => {
  try {
    const imageUrl = await getImageDownloadURL("experiences", req.file);
    const experienceData = new Experience({ imageUrl: imageUrl, ...req.body ,
      skills:JSON.parse(req.body.skills)
    });
    await experienceData.save();
    res.status(201).send(experienceData);
  } catch (error) {
    const info = getObjKeys(error)
    res.status(400).json({success:false,message:`${info.path} - (${info.message})`});
  }
};
  
exports.getExperiences = async (req, res) => {
  try { 
    const experienceData = await Experience.find();
    res.status(200).send(experienceData);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getExperienceById = async (req, res) => {
  try {
    const experienceData = await Experience.find({
      experienceId: req.params.id,
    });
    if (!experienceData) {
      return res.status(404).send("experience field doesn't exixts");
    }
    res.status(200).send(experienceData);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getExperienceByUserId = async (req, res) => {
  try {
    const experienceData = await Experience.find({ userId: req.params.id });
    if (!experienceData) {
      res.send("The required experience doesn't exists");
    } else {
      res.status(200).send(experienceData);
    }
  } catch (error) {}
};
exports.updateExperienceById = async (req, res) => {
  try {
    //  if (req.file){
    imageUrl = await getImageDownloadURL("experiences", req.file);
    //  }
    const experienceData = await Experience.findOneAndUpdate(
      { experienceId: req.params.id },
      {
        imageUrl: imageUrl,
        ...req.body,
      },
      { new: true }
    );
    if (!experienceData) {
      return res.status(404).send(experienceData);
    }
    res.status(200).send(experienceData);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const experienceData = await Experience.findOneAndDelete({
      experienceId:req.params.id
    });
    if (!experienceData) {
      return res.status(404).send("doesn't exists");
    }
    res.status(200).send(experienceData);
  } catch (error) {
    res.status(400).send(error);
  }
};