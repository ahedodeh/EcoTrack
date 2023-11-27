const { ref, uploadBytes, deleteObject, listAll } = require("firebase/storage");
const storage = require("../config/firebase");

const allowedImageFolderNames = ["images"];
const allowedFileFolderNames = ["files"];

exports.deleteFile = async (folderName, fileName) => {
  if (!allowedFileFolderNames.includes(folderName)) {
    throw new Error("Invalid file folder name");
  }

  const storageRef = ref(storage, `files/${folderName}/${fileName}`);

  try {
    await deleteObject(storageRef);
    return { message: "File deleted successfully" };
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
};

exports.uploadFile = async (folderName, file) => {
  if (!allowedFileFolderNames.includes(folderName)) {
    throw new Error("Invalid file folder name");
  }

  const storageRef = ref(storage, `files/${folderName}/${file.originalname}`);

  if (!file.buffer) {
    throw new Error("File buffer is missing");
  }

  try {
    await uploadBytes(storageRef, file.buffer);
    console.log("File uploaded");
    return { message: "File uploaded successfully" };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
};

exports.listFiles = async (folderName) => {
  if (!allowedFileFolderNames.includes(folderName)) {
    throw new Error("Invalid file folder name");
  }

  const folderRef = ref(storage, `files/${folderName}`);

  try {
    const listResult = await listAll(folderRef);
    const fileNames = listResult.items.map((item) => {
      return item.name;
    });

    return fileNames;
  } catch (error) {
    console.error("Error listing files:", error);
    throw new Error("Failed to list files");
  }
};
