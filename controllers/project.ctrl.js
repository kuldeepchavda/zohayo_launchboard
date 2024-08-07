const getImageDownloadURL = require("../utils/uploadImage");
const getFileDownloadURL = require("../utils/getFileDownloadUrl");
const Projects = require("../models/Projects");
const { v4: uuidv4 } = require("uuid");

// const { link } = require("../routes/projects.routes");
exports.createProject = async (req, res) => {
  try {
    const { category, linkedin, discord, twitter, github } = req.body;
    //categories
    const projectId = uuidv4();
    console.log(req.body);
    const socials = {
      twitter: twitter,
      github: github,
      discord: discord,
      linkedin: linkedin,
    };
    const imageFile = req.files?.image?.[0];
    const otherFiles = req.files?.files || [];
    const imageUrl = await getImageDownloadURL("testings/images", imageFile);

    // Upload each file in the "filess" array and store their URLs
    const fileUrls = await Promise.all(
      otherFiles.map((file) => getFileDownloadURL("testings/files", file))
    );
    console.log(imageUrl, fileUrls);
    const projectsData = new Projects({
      imageUrl: imageUrl,
      projectId,
      ...req.body,
      fileUrls,
      category: JSON.parse(req.body.category),
      socials,
    });
    await projectsData.save();
    res.status(201).send(projectsData);
    console.log(projectsData);
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
    const projectsData = await Projects.deleteOneAndDelete({
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

//  ***************************************************************************************************************// collaborators
//file operations

exports.fileDelete = async (req, res) => {
  const { projectId, fileId } = req.params;
  const project = await Projects.findOne({ projectId });
  console.log(project);
  const particularFile = project.fileUrls.find((file) => file.fileId == fileId);
  const ind = project.fileUrls.indexOf(particularFile);
  project.fileUrls.splice(ind, 1);
  project.save();
  res.send(project);
};

// to add collaborator
exports.createCollaborator = async (req, res) => {
  try {
    const { projectId } = req.params;
    req.body.imageUrl = await getImageDownloadURL("collaborators", req.file);
    const collaborator = req.body;
    console.log(req.body.imageUrl);
    const project = await Projects.findOneAndUpdate(
      { projectId: projectId },
      { $push: { collaborators: collaborator } }
    );
    console.log(project);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.collaborators.push(collaborator);
    // await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// to get all the projects , paticular user is part of
exports.getCollaboratorProjects = async (req, res) => {
  const { userId } = req.params;
  const project = await Projects.find({
    collaborators: {
      $elemMatch: {
        userId: userId,
      },
    },
  });
  console.log(project);
  res.send(project);
};

exports.updateCollaboratorById = async (req, res) => {
  try {
    const { projectId, userId } = req.params;
    req.body.imageUrl = await getImageDownloadURL("collaborators", req.file);
    const updatedData = req.body;
    console.log(req.params);

    // Build the dynamic update object
    const updateFields = {};
    for (let key in updatedData) {
      updateFields[`collaborators.$.${key}`] = updatedData[key];
    }

    console.log(updateFields);
    const project = await Projects.updateOne(
      { projectId: projectId, "collaborators.userId": userId },
      { $set: updateFields },
      { new: true }
    );

    console.log("project", project);
    if (!project) {
      return res
        .status(404)
        .json({ message: "Project or collaborator not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCollaborator = async (req, res) => {
  try {
    const { projectId, userId } = req.params;

    const project = await Projects.findOneAndUpdate(
      { projectId },
      { $pull: { collaborators: { userId: userId } } },
      { new: true }
    );

    if (!project) {
      return res
        .status(404)
        .json({ message: "Project or collaborator not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
