const fileModel = require("../models/dataUpload");
const multer = require("multer");

const allowedFileFolderNames = ["files"];

const upload = multer({ storage: multer.memoryStorage() });

exports.deleteFile = async (req, res, next) => {
  try {
    const { folderName, fileName } = req.params;

    if (!allowedFileFolderNames.includes(folderName)) {
      return res.status(400).json({ message: "Invalid file folder name" });
    }

    await fileModel.deleteFile(folderName, fileName);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Failed to delete file" });
  }
};

exports.uploadFile = async (req, res, next) => {
  try {
    const { folderName } = req.params;

    if (!allowedFileFolderNames.includes(folderName)) {
      return res.status(400).json({ message: "Invalid file folder name" });
    }

    upload.single(folderName)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        res.status(400).json({ message: "No file provided" });
        return;
      }

      await fileModel.uploadFile(folderName, req.file);
      res.status(200).json({ message: "File uploaded successfully" });
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};

exports.listFiles = async (req, res, next) => {
  try {
    const { folderName } = req.params;

    if (!allowedFileFolderNames.includes(folderName)) {
      return res.status(400).json({ message: "Invalid file folder name" });
    }

    const fileNames = await fileModel.listFiles(folderName);
    res.status(200).json({ fileNames });
  } catch (error) {
    console.error("Error listing files:", error);
    res.status(500).json({ error: "Failed to list files" });
  }
};
