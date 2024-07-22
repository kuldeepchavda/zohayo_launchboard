const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json())
const contactRoute= require("./routes/contactUs.routes")
const newsletterRoutes = require("./routes/newsletteremail.routes");
const profileRoutes = require("./routes/profile.routes");
dotenv.config();
app.use("/contact",contactRoute)
app.use("/newsletter",newsletterRoutes)
app.use("/profile",profileRoutes)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Databae conneted");
  })
  .catch((err) => {
    console.log("Error occured", err.message);
  });
app.listen(8080, () => {
  console.log("this app is working fine.");
});
