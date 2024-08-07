const Job = require("../models/Job");
const getImageDownloadURL = require("../utils/uploadImage");
const getFileDownloadURL = require("../utils/getFileDownloadUrl")
exports.createJob = async (req, res) => {
  try {
const imageFile = req.files?.image?.[0];
const otherFiles = req.files?.files || [];
const imageUrl = await getImageDownloadURL("testings/images", imageFile);

// Upload each file in the "filess" array and store their URLs
const fileUrls = await Promise.all(
  otherFiles.map((file) => getFileDownloadURL("testings/files", file))
);
console.log(imageUrl, fileUrls);

    console.log(req.body);
    // category;
    const categoryComponents = req.body.requirements;
    console.log(categoryComponents);
    const socialLinks = JSON.parse(req.body.socialLinks);
    console.log(socialLinks);
    const job = new Job({
      jobId: uuid(),
      ...req.body,
      fileUrls,
      imageUrl,
      socialLinks,
      requirements: JSON.parse(req.body.requirements),
    }); 
    await job.save();
    console.log(job);
    res.status(201).send(job);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).send(jobs);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getJobByJobId = async (req, res) => {
  try {
    const job = await Job.findOne({ jobId: req.params.id });
    if (!job) {
      return res.status(404).send("No job found!");
    }
    res.status(200).send(job);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.getJobsByUserId = async (req, res) => {
  try {
    const job = await Job.find({ userId: req.params.id });
    if (!job) {
      return res.status(404).send();
    }
    res.status(200).send(job);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateJobByJobId = async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) {
      updates.imageUrl = await getImageDownloadURL("jobs", req.file);
    }

    const job = await Job.findOneAndUpdate({ jobId: req.params.id }, updates, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return res.status(404).send("Job does not exists.");
    }
    res.status(200).send(job);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ jobId: req.params.id });
    if (!job) {
      return res.status(404).send();
    }
    res.status(200).send(job);
  } catch (error) {
    res.status(400).send(error);
  }
};


exports.fileDelete = async (req, res) => {
  const { jobId, fileId } = req.params;
  const job = await Job.findOne({ jobId });
  console.log(job);
  const particularFile = job.fileUrls.find((file) => file.fileId == fileId);
  console.log("the file is",particularFile)
  const ind = job.fileUrls.indexOf(particularFile);
  job.fileUrls.splice(ind, 1);
  await job.save();
  res.send(job);
};
