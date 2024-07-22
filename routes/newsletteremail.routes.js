const newsletterCTRLs = require("../controllers/newsletteremails.ctrl")
const express = require("express")
const router = express.Router()

router.route("/add").post(newsletterCTRLs.saveEmail)
router.route("/getall").get(newsletterCTRLs.getEmails)
router.route("/delete/:email").delete(newsletterCTRLs.deleteEmail)

module.exports = router