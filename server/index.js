import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import UserModel from "./Models/UserModel.js";
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 3000;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./public/images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const image = req.file.filename;
  const newUser = new UserModel({
    image,
  });
  newUser
    .save()
    .then((data) => {
      res.json("Image uploaded successfully");
      console.log(data);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

app.get("/images", (req, res) => {
  UserModel.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

app.listen(port, async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Server is running on port ${port}`);
      console.log("connected to database!");
    })
    .catch((err) => {
      console.log(err);
      console.error("Failed to connect to MongoDB:", err.message);
    });
});
