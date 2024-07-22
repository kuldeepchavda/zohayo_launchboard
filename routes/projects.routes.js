const express = require("express");
const router = express.Router();
const projectsControllers = require("../controllers/project.ctrl");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/create",
  upload.single("image"),
  projectsControllers.createProject
),
  router.get("/getall", projectsControllers.getProjects);
router.get("/get/project/:id", projectsControllers.getProjectById);
router.get("/get/user/:id", projectsControllers.getprojectsByUserId);
router.put(
  "/update/:id",
  upload.single("image"),
  projectsControllers.updateProjectById
);
router.delete("/delete/:id", projectsControllers.deleteProject);
module.exports = router;