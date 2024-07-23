
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json())
const contactRoute= require("./routes/contactUs.routes")
const newsletterRoutes = require("./routes/newsletteremail.routes");
const profileRoutes = require("./routes/profile.routes");
const experienceRoutes = require("./routes/experience.routes")
const projectsRoutes = require("./routes/projects.routes")
const jobRoutes = require("./routes/job.routes")
app.use("/contact",contactRoute);
app.use("/newsletter",newsletterRoutes);
app.use("/profile",profileRoutes);
app.use("/experience",experienceRoutes)
app.use("/projects",projectsRoutes)
app.use("/job",jobRoutes)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database conneted");
  })
  .catch((err) => {
    console.log("Error occured", err.message);
  });
  
app.listen(PORT, () => {
  console.log(`running on port ${PORT}.`);
});
