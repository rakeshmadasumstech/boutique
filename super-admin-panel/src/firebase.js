 import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLMuerWS7uoi8RRsBRNXwN-PCPfmgzoy8",
  authDomain: "super-admin-auth-2059b.firebaseapp.com",
  projectId: "super-admin-auth-2059b",
  appId: "1:1048687090722:web:4e9b65268b0d1a9a7d7e7b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 export const auth = getAuth(app);

export default app;
