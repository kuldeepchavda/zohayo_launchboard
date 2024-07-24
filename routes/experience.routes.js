const express = require("express");
const router = express.Router();
const experienceController = require("../controllers/experience.ctrl");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/create", upload.single("image"),experienceController.createExperience);
router.get("/getall", experienceController.getExperiences);
router.get("/get/experience/:id", experienceController.getExperienceById);
router.get("/get/user/:id", experienceController.getExperienceByUserId);
router.put("/update/:id",upload.single("image"),experienceController.updateExperienceById);
router.delete("/delete/:id", experienceController.deleteExperience);

module.exports = router;
