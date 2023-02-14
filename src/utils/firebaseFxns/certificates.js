import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, Timestamp, doc, setDoc,collection, query, where,getDocs } from "firebase/firestore";
import { ulid } from 'ulid'
import { cert } from "firebaseConfig";


const db = getFirestore(cert);

const ImageUploader = async(file) => {
    console.log("inside imgUp")
    const storage = getStorage(cert, "gs://certificates-phoenix.appspot.com");
    const fileName = ulid();
    const storageRef = ref(storage, 'templates/' + fileName + ".png");

    // upload file to firestore
   return  await uploadBytes(storageRef, file, { contentType: "image/png" }).then((snapshot) => {
        console.log(snapshot)
        console.log('Uploaded a blob or file!');
        return getDownloadURL(storageRef)
            .then((url) => {
                console.log(url)
                return url
            })
    });
}

const CsvUploader = async(lists, metaId, eventName, eventDate) => {
    // upload file to firestore
    try {
        for (let i = 0; i < lists.length; i++) {
            const participantId = ulid();
            const cId = ulid();
            const participantsRef = doc(db, 'participents', participantId);
            const cIdRef = doc(db, 'cIds', cId);
            var q = query(collection(db, "participents"), where("email", "==", lists[i].email))
             await getDocs(q).then(async(snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents");
          await setDoc(participantsRef, {
            createdAt: Timestamp.fromDate(new Date()),
            email: lists[i].email,
            name: lists[i].name,
            updatedAt: Timestamp.fromDate(new Date()),
            id: participantId,
            events: [metaId],
            cIds: [
                cId
            ]
        }, { capital: true }, { merge: true });
        } else {
          console.log("Document with the same email exists");
            const docD = snapshot.docs[0];
            const updates = {
                events: [...docD.data().events, metaId],
                cIds: [...docD.data().cIds, cId]
            }
            await setDoc(doc(db, 'participents',docD.id), updates, { merge: true });
          
        }
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
           
            await setDoc(cIdRef, {
                createdAt: Timestamp.fromDate(new Date()),
                id: cId,
                user: lists[i].name,
                email: lists[i].email,
                eventId: metaId,
                event: eventName,
                eventDate: eventDate,
            }, { capital: true }, { merge: true });
        }
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}


export async function uploadCertficateAdmin(file, name, id, eventName, eventDate, createdBy, lists) {
    try {
        const eId = ulid();
        const metaRef = doc(db, 'certMetas', eId);
        var fileUrl = await ImageUploader(file);
        await setDoc(metaRef, {
            createdAt: Timestamp.fromDate(new Date()),
            eId: eId,
            cId: id,
            name: name,
            eventDate: eventDate,
            eventName: eventName,
            createdBy: createdBy || 'admin420',
            cert_url: fileUrl,
        }, { capital: true }, { merge: true });
    
        var isDone = await CsvUploader(lists, eId, eventName, eventDate);
        if (isDone) {
            return true;
        }else{
            return false;
        }
    } catch (error) {
        return false;
    }
}


// module.exports = uploadCertficateAdmin;