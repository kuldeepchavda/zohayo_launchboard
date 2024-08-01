// import slugify from "@sindresorhus/slugify";
const { firebaseStorage } = require("../firebase");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 2000;
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage });
const getFileDownloadURL = async (dir, file) => {
  // "dir" defins the path at your bucket where you would like to put your data
  try {
    // const { default: slugify } = await import("@sindresorhus/slugify");
    if (file) {
      const extension = path.extname(file.originalname);
      const filename = uuidv4() + extension;
      // console.log(filename);
      const imageRef = ref(firebaseStorage, `${dir}/${filename}`);
      const snapshot = await uploadBytes(imageRef, file.buffer);
      const imageURL = await getDownloadURL(snapshot.ref);
      // console.log(imageURL);
      return imageURL;
    }
  } catch (error) {
    return console.log(error);
  }}
module.exports = getFileDownloadURL;
// app.listen(port,()=>{console.log(`app listening on port ${port}`)})
