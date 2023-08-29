import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import smptjs from "smtpjs"; // Correct the import statement
import {
  getFirestore,
  Timestamp,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ulid } from "ulid";
import { db } from "firebaseConfig";
import { sendEmail } from "components/smptjs/smptjs";
// import { addContactToList, addContact } from "../sendinblue/sendinblue";
const email1 = "gadarsh747@gmail.com"
const REGISTERED_USERS_ID = 5;

// Define your React state variables using useState here
// const [Subject, setSubject] = useState("This is subject");
// const [Body, setBody] = useState("This is body");

// const config = {
//   SecureToken: "815eff5d-ad8b-492d-97f6-42a22832908b",
//   Server: "smtp.elasticemail.com",
//   To: "gadarsh747@gmail.com",
//   From: "mail.phoenixnsec@gmail.com",
//   Subject: "This is subject", // Use your Subject state variable
//   Body: "This is body", // Use your Body state variable
// };

// Define your React component here

export async function verifyUser(email, uid) {
  try {
    const updates = {
      isVerified: true,
    };
    await setDoc(doc(db, "registrations", uid), updates, { merge: true });
    // await addContact(email);
    // await addContactToList([email], REGISTERED_USERS_ID);
    await sendEmail(email1);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function unverifyUser(email, uid) {
  try {
    const updates = {
      isVerified: false,
    };
    await setDoc(doc(db, "registrations", uid), updates, { merge: true });
    // await addContact(email);
    // await addContactToList([email], REGISTERED_USERS_ID);
    await sendEmail(email1);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

