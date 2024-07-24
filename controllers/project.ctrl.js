const getImageDownloadURL = require("../utils/uploadImage");
const Projects = require("../models/Projects");
exports.createProject = async (req, res) => {
  try {
    const { category, fblink, twtlink, instalink } = req.body;
    //categories
    const finalCategory = [];
    const categoryComponents = category.split(" ");
    categoryComponents.map((cat) => {
      if (finalCategory.indexOf(cat) == -1) {
        finalCategory.push(cat);
      }
    });

    // socials

    const socials = {
      twitter: twtlink,
      instagram: instalink,
      facebook: fblink,
      discord: "www.dclink.com",
    };

    const imageUrl = await getImageDownloadURL("projects", req.file);
    const projectsData = new Projects({
      imageUrl: imageUrl,
      ...req.body,
      category: finalCategory,
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
    const projectsData = await Projects.deleteMany({
      // projectId: req.params.id,
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
