const express = require("express")
const router = express.Router()
const profileCTRLs = require("../controllers/profile.ctrl")

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Create a new profile
router
  .route("/upload")
  .post(upload.single("image"), profileCTRLs.createProfile);
// Get all profiles
router.get("/getall", profileCTRLs.getProfiles);

// Get a single profile by ID
router.get("/get/:id", profileCTRLs.getProfileById);

// Update a profile by ID
router.put("/update/:id", profileCTRLs.updateProfile);

// Delete a profile by ID
router.delete("/delete/:id", profileCTRLs.deleteProfile);

module.exports = router;

module.exports  = router