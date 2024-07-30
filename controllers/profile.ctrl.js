const Profile = require("../models/Profile");
const getImageDownloadURL = require("../utils/uploadImage");
// Create a new profile
exports.createProfile = async (req, res) => {
  try {
    const imageUrl = await getImageDownloadURL(
      "/launchBoard",
      req.file
    );
     console.log(imageUrl);
     console.log("body", req.body);
    const profile = new Profile({
      imageUrl: imageUrl,
      userId: req.body.id,
      name: req.body.name,
      bio: req.body.bio,
      socials: req.body.socials,
      projectLink: req.body.projectLink,
    });
    console.log(`user:-${req.body._id} created`);
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all profiles
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a profile by ID
exports.updateProfile = async (req, res) => {
  try {
    const imageUrl = await getImageDownloadURL("launchBoard", req.file);
    console.log(imageUrl)
    // console.log(imageUrl);
    console.log("body",req.body)
    const profile = await Profile.findOneAndUpdate(
      { userId: req.params.id },
      {
        $set: { imageUrl, ...req.body },
      }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    } else {
      res.status(200).json(profile);
      console.log(`${req.params.id} updated`);
      console.log(profile)
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

// Delete a profile by ID
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ userId: req.params.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    } else {
      res.status(200).json({ message: "Profile deleted successfully" });
      console.log(`${req.params.id} deleted`);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}