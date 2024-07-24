const express = require("express")
const router = express.Router()
const feedControllers = require("../controllers/feed.ctrl")
router.route("/project").get(feedControllers.projectFeed);
router.route("/job").get(feedControllers.jobFeed);
module.exports = router