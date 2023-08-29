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
const REGISTERED_USERS_ID = 5;

export async function verifyUser(email, name, uid) {
  try {
    const updates = {
      isVerified: true,
    };
    await setDoc(doc(db, "registrations", uid), updates, { merge: true });
    // await addContact(email);
    // await addContactToList([email], REGISTERED_USERS_ID);
    let firstName, lastName;
    try {
      [firstName, lastName] = name.split(" ");
    } catch {
      firstName = "";
      lastName = "";
    }
    await sendEmail(email, firstName, lastName);
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
    await sendEmail(email, firstName, lastName);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
