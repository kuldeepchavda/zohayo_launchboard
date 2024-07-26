const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.ctrl");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/create", upload.single("image"), jobController.createJob);
router.get("/getAll", jobController.getJobs);
router.get("/get/jobid/:id", jobController.getJobByJobId);
router.get("/get/userid/:id", jobController.getJobsByUserId);
router.put("/update/:id", upload.single("image"), jobController.updateJobByJobId);
router.delete("/delete/:id", jobController.deleteJob);
module.exports = router;