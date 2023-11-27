const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, deleteObject } = require("firebase/storage");


// config
const firebaseConfig = {
  apiKey: "AIzaSyDAi-xNP5w9b8X4q6INyfC4KRs086SJbM4",
  authDomain: "ecotrack-f6a21.firebaseapp.com",
  projectId: "ecotrack-f6a21",
  storageBucket: "ecotrack-f6a21.appspot.com",
  messagingSenderId: "1056999810273",
  appId: "1:1056999810273:web:262d42b2743a26603503a0",
  measurementId: "G-X8CNHHVRE9"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = storage;