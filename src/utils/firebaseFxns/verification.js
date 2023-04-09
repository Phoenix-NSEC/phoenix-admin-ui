import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, Timestamp, doc, setDoc,collection, query, where,getDocs } from "firebase/firestore";
import { ulid } from 'ulid'
import { db } from "firebaseConfig";



export async function verifyUser(uid) {
    try {
        const updates = {
            isVerified: true,
        }
        var isDone = await setDoc(doc(db, 'registrations',uid), updates, { merge: true });
        if (isDone) {
            return true;
        }else{
            return false;
        }
    } catch (error) {
        return false;
    }
}