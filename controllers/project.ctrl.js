const getImageDownloadURL = require("../utils/uploadImage");
const Projects = require("../models/Projects");
exports.createProject = async (req, res) => {
  try {
    const imageUrl = await getImageDownloadURL("projects", req.file);
    const projectsData = new Projects({ imageUrl: imageUrl, ...req.body });
    await projectsData.save();
    res.status(201).send(projectsData);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projectsData = await Projects.find();
    res.status(200).send(projectsData);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.getProjectById = async (req, res) => {
  try {
    const projectsData = await Projects.find({
      projectId: req.params.id,
    });
    if (!projectsData) {
      return res.status(404).send("experience field doesn't exixts");
    }
    res.status(200).send(projectsData);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getprojectsByUserId = async (req, res) => {
  try {
    const projectsData = await Projects.find({ userId: req.params.id });
    if (!projectsData) {
      res.send("The required Projects doesn't exists");
    } else {
      res.status(200).send(projectsData);
    }
  } catch (error) {}
};
exports.updateProjectById = async (req, res) => {
  try {
    //  if (req.file){
    imageUrl = await getImageDownloadURL("projects", req.file);
    //  }
    const projectsData = await Projects.findOneAndUpdate(
      { projectId: req.params.id },
      {
        imageUrl: imageUrl,
        ...req.body,
      },
      { new: true }
    );
    if (!projectsData) {
      return res.status(404).send(projectsData);
    }
    res.status(200).send(projectsData);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const projectsData = await Projects.deleteMany({
      projectId: req.params.id,
    });
    if (!projectsData) {
      return res.status(404).send("doesn't exists");
    }
    res.status(200).send(projectsData);
  } catch (error) {
    res.status(400).send(error);
  }
};
