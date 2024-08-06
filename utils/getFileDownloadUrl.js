const { firebaseStorage } = require("../firebase");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 2000;
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage });

const getFileDownloadURL = async (dir, file) => {
  try {
    if (file) {
      console.log(file);
      const extension = path.extname(file.originalname);
      if (extension == ".pdf" || extension == ".docx") {
        const filename = file.originalname;
        const fileRef = ref(firebaseStorage, `${dir}/${filename}`);
        const snapshot = await uploadBytes(fileRef, file.buffer);
        const fileURL = await getDownloadURL(snapshot.ref);
        const fileId = uuidv4();
        return { fileId, fileName:filename, fileUrl:fileURL };
      } else {
        return "file type not valid.";
      }
    }
  } catch (error) {
    console.log(error);
console.log(error.message)
  }
};

app.post(
  "/uploadfile",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "filess", maxCount: 10 }, // Allow up to 10 files under "filess"
  ]),
  async (req, res) => {
    const imageFile = req.files?.image?.[0];
    const otherFiles = req.files?.filess || [];

    const imageURL = await getFileDownloadURL("testings/images", imageFile);

    // Upload each file in the "filess" array and store their URLs
    const fileURLs = await Promise.all(
      otherFiles.map((file) => getFileDownloadURL("testings/files", file))
    );

    if (imageURL && fileURLs.every((url) => url !== null)) {
      res.json({ success: true, data: { imageURL, fileURLs } });
    } else {
      res.json({ success: false, message: "File upload failed" });
    }
  }
);

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

module.exports  = getFileDownloadURL