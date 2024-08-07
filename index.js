const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000; // Default to port 5000 if PORT is not defined
const express = require("express");
const mongoose = require("mongoose");
const http = require("http"); // Import the http module
const { join } = require("node:path");
const app = express();
const authRouter = require("./routes/authentication.routes");
const server = http.createServer(app); // Create an HTTP server
const socketServices = require("./services/socketServices");
// Import your routes
const usersRoutes = require("./routes/users.routes");
const contactRoute = require("./routes/contactUs.routes");
const newsletterRoutes = require("./routes/newsletteremail.routes");
const profileRoutes = require("./routes/profile.routes");
const experienceRoutes = require("./routes/experience.routes");
const projectsRoutes = require("./routes/projects.routes");
const jobRoutes = require("./routes/job.routes");
const feedRoutes = require("./routes/feeds.routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
app.use(cors({
  origin: '*',
}));
const passport = require("passport");
// Use middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

require("./config/passportConfig")(passport);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// Use routes

app.use("/auth", authRouter);
app.use("/contact", contactRoute);
app.use("/newsletter", newsletterRoutes);
app.use("/profile", profileRoutes);
app.use("/experience", experienceRoutes);
app.use("/projects", projectsRoutes);
app.use("/job", jobRoutes);
app.use("/feeds", feedRoutes);
app.use("/people", usersRoutes);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error occurred", err.message);
  });
socketServices(server);
// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});