import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, Timestamp, doc, setDoc } from "firebase/firestore";
import { ulid } from 'ulid'
import { cert } from "firebaseConfig";


const db = getFirestore(cert);

const ImageUploader = async(file) => {
    console.log("inside imgUp")
    const storage = getStorage(cert, "gs://certificates-phoenix.appspot.com");
    const fileName = ulid();
    const storageRef = ref(storage, 'templates/' + fileName + ".png");

    // upload file to firestore
    await uploadBytes(storageRef, file, { contentType: "image/png" }).then((snapshot) => {
        console.log(snapshot)
        console.log('Uploaded a blob or file!');
        getDownloadURL(storageRef)
            .then((url) => {
                console.log(url)
                return url
            })
    });
}

const CsvUploader = async(lists, metaId, eventName, eventDate) => {
    // upload file to firestore
    for (let i = 0; i < lists.length; i++) {
        const participantId = ulid();
        const cId = ulid();
        const participantsRef = doc(db, 'participents', participantId);
        const cIdRef = doc(db, 'cIds', cId);
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


}


export async function uploadCertficateAdmin(file, name, id, eventName, eventDate, createdBy, lists) {
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

    CsvUploader(lists, eId, eventName, eventDate);
    return true;
}


// module.exports = uploadCertficateAdmin;