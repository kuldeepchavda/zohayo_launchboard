const Profile = require("../models/Profile");
const getImageDownloadURL = require("../utils/uploadImage");

// Create a new profile
exports.createProfile = async (req, res) => {
  try {
    const imageUrl = await getImageDownloadURL("/launchBoard", req.file);

    const jsonData = {
      socialLinks: JSON.parse(req.body.socialLinks),
      country: JSON.parse(req.body.country),
      city: JSON.parse(req.body.city),
      state: JSON.parse(req.body.state),
      language: JSON.parse(req.body.language),
    };

    const profileData = {
      imageUrl,
      ...req.body,
      ...jsonData,
    };

    const profile = new Profile(profileData);
    await profile.save();

    res.status(201).json({ success: true, data: profile });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all profiles
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json({ success: true, data: profiles });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get a single profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.id });
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a profile by ID
exports.updateProfile = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      updates.imageUrl = await getImageDownloadURL("launchBoard", req.file);
    }

    // Parse the stringified JSON fields
    updates.language = JSON.parse(req.body.language);
    updates.socialLinks = JSON.parse(req.body.socialLinks);
    updates.country = JSON.parse(req.body.country);
    updates.city = JSON.parse(req.body.city);
    updates.state = JSON.parse(req.body.state);

    const profile = await Profile.findOneAndUpdate(
      { userId: req.params.id },
      { $set: updates },
      { new: true } // Return the updated document
    );

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a profile by ID
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ userId: req.params.id });

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
