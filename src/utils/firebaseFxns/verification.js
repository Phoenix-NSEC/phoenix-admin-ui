import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
import { addContactToList, addContact } from "../sendinblue/sendinblue";

const REGISTERED_USERS_ID = 5;

export async function verifyUser(email, uid) {
  try {
    const updates = {
      isVerified: true,
    };
    await setDoc(doc(db, "registrations", uid), updates, { merge: true });
    await addContact(email);
    await addContactToList([email], REGISTERED_USERS_ID);
    return true;
  } catch (error) {
    return false;
  }
}
