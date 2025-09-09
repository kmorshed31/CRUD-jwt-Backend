// routes/csvimport.route.js
import express from "express";
import multer from "multer";
import { handleCsvUpload } from "../controllers/csvimport.controller.js";

const router = express.Router();

// Minimal Multer config: save to project-root/uploading/, 5MB, only .csv
const upload = multer({
  dest: "uploading/",
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const extOK = file.originalname.toLowerCase().endsWith(".csv");
    const typeOK =
      file.mimetype === "text/csv" ||
      file.mimetype === "application/vnd.ms-excel" ||
      file.mimetype === "application/csv";
    if (!extOK && !typeOK) return cb(new Error("Only .csv files are allowed"));
    cb(null, true);
  },
});

// POST /api/csvimport  (form field must be "file")
router.post("/", upload.single("file"), handleCsvUpload);

export default router;

