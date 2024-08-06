const Job  = require("../models/Job")
const Projects = require("../models/Projects");
exports.projectFeed = async (req, res) => {
  try {
    let queryCategories = [];

    // Handling both comma-separated values and multiple query parameters
    if (req.query.requirements) {
      queryCategories = req.query.category.split(",");
      const projects = await Projects.find({
        requirements: { $in: queryCategories },
      });
      res.status(200).json(projects);
    } else {
      const projects = await Projects.find();
      return res.status(200).json(projects);
    }
    console.log(req.query);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve projects" });
  }
};

exports.jobFeed = async (req, res) => {
  try {
    const { category, jobType, compensation } = req.query;

    const categoryArray = category ? category.split(",") : [];

    const filter = {};
    if (categoryArray.length > 0 && categoryArray[0].toLowerCase() !== 'all') {
      filter.category = { $in: categoryArray };
    }
    if (jobType) {
      filter.jobType = new RegExp(`^${jobType}$`, "i"); // Case-insensitive match
    }
    if (compensation) {
      filter.compensationType = new RegExp(`^${compensation}$`, "i"); // Case-insensitive match
    }
    console.log(filter)
    const jobs = await Job.find(filter);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

};