const Job = require("../models/Job");
const getImageDownloadURL = require("../utils/uploadImage");

exports.createJob = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      imageUrl = await getImageDownloadURL("jobs", req.file);
    }

    const job = new Job({
      ...req.body,
      imageUrl,
    });
    await job.save();
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

    const job = await Job.findOneAndUpdate(
      { jobId: req.params.id },
      updates,
      { new: true, runValidators: true }
    );
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
    const job = await Job.findOneAndDelete({jobId:req.params.id});
    if (!job) {
      return res.status(404).send();
    }
    res.status(200).send(job);
  } catch (error) {
    res.status(400).send(error);
  }
};
