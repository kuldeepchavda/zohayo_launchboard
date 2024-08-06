const express = require("express");
const router = express.Router();
const projectsControllers = require("../controllers/project.ctrl");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "files", maxCount: 10 }, // Allow up to 10 files under "filess"
  ]),

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

// routes for collaborators
router
  .route("/collaborator/create/:projectId")
  .put(upload.single("image"), projectsControllers.createCollaborator);
router.get(
  "/collaborator/get/:userId",
  projectsControllers.getCollaboratorProjects
);

router.put(
  "/collaborator/update/:projectId/:userId",
  upload.single("image"),
  projectsControllers.updateCollaboratorById
);
router.delete(
  "/collabprator/delete/:projectId/:userId",
  projectsControllers.deleteCollaborator
);
module.exports = router;
