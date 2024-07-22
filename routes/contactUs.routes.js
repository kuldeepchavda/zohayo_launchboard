const express = require("express")
const router = express.Router()
const contactsControllers = require("../controllers/contact.controllers")

router.route("/create").post(contactsControllers.createContact);
router.route("/getall").get(contactsControllers.getAllContacts);
router.route("/get/:email").get(contactsControllers.getByEmail)
module.exports = router 