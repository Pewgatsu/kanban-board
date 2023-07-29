import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBl5kAYpTA0fWr2_orl-B2a5zxe84Rqm5Q",
  authDomain: "kanban-12c7f.firebaseapp.com",
  projectId: "kanban-12c7f",
  storageBucket: "kanban-12c7f.appspot.com",
  messagingSenderId: "154296443734",
  appId: "1:154296443734:web:8606a8af97402535886cf7",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
