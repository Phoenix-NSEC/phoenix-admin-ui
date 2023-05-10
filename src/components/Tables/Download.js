import React, { useEffect, useState, useRef } from "react";
import {
  Avatar,
  Text,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { verifyUser } from "utils/firebaseFxns/verification";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
// import { auth, db, maindb } from "../firebaseConf";
import axios from "axios";
import { db, maindb, auth } from "firebaseConfig";
import { certdb } from "firebaseConfig";


const Download = ({ email }) => {
  const [userData, setUserData] = useState();
  const [idCard, setIdcard] = useState();
  let canvas;
  let ctx;
  let img = new Image();
  let avatar = new Image();

  const ref1 = useRef();
  const ref2 = useRef();
  const [CertLoading, setCertloading] = useState(true);

  const fetchUserData = async (email) => {
    const q1 = query(
      collection(certdb, "idMeta")
    );

    const q2 = query(
      collection(maindb, "registrations"),
      where("email", "==", email)
    );

    const getIdcard = await getDocs(q1);
    const getUserDetails = await getDocs(q2);

    getIdcard.forEach((doc) => {
      setIdcard(doc.data());
    });
    getUserDetails.forEach((doc) => {
      setUserData(doc.data());
    });
  };
//   console.log(idCard);

  function getImageAsBase64(url) {
    return axios.get(url, { responseType: "blob" }).then((response) => {
      const reader = new FileReader();
      reader.readAsDataURL(response.data);
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
        reader.onerror = reject;
      });
    });
  }

  const Download = async () => {
    var link = ref2?.current;
    link.href = canvas?.toDataURL();
    link.download = `idcard.png`; //name of the downloaded certificate
  };

  useEffect(() => {
    if (userData?.isVerified && ref1.current!==null) {
      canvas = ref1.current;
      console.log(canvas);
      console.log(ref1);
      ctx = canvas.getContext("2d");
      console.log(ctx);
    }

    async function renderImage() {
      if (userData && idCard) {
        img.src = await getImageAsBase64(idCard?.url); // change url
        avatar.src = await getImageAsBase64(userData.profilePic);
        setCertloading(false);
      }
    }

    renderImage();

    img.onload = function () {
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Add text to the image
      if (userData) {
        ctx.font = "30px poppins";
        ctx.fillStyle = idCard.name.fontColor;
        ctx.fillText(userData.name, idCard.name.x, idCard.name.y);
        ctx.font = "13.5px poppins";
        ctx.fillStyle = userData.id.fontColor;
        ctx.fillText(userData.id, idCard.idRef.x, idCard.idRef.y);
        ctx.font = "15px poppins";
        ctx.fillStyle = userData.id.fontColor;
        ctx.fillText(userData.department, idCard.dept.x, idCard.dept.y);
        ctx.font = "15px poppins";
        ctx.fillStyle = userData.id.fontColor;
        ctx.fillText( getSession(userData.graduation), idCard.session.x, idCard.session.y);
    }
};
    avatar.onload = () => {
      ctx?.drawImage(
        avatar,
        idCard.image.x,
        idCard.image.y,
        idCard.image.w,
        idCard.image.h
      );
    };
  });

  function getSession(year) {
    let gradYear = +year;
    let startYear = gradYear - 4;
    return `${startYear}-${gradYear}`;
  }

  useEffect(() => {
    fetchUserData(email);
  },[]);
//   console.log(canvas);
//   console.log(ctx);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Download</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {userData && userData?.isVerified ? (
              <div
                className={`xsm:scale-[.4] md:scale-[1] ${
                  CertLoading && "bg-slate-200 animate-pulse"
                } border-2 border-blue-300`}
              >
                <canvas
                  ref={ref1}
                  className="canvas"
                  height="500"
                  width="800"
                />
              </div>
            ) : (
              <div
                className={`xsm:scale-[.4] md:scale-[1] 'bg-slate-200 animate-pulse flex justify-center items-center h-[70%] w-[70%]`}
              >
                Account isn't verified yet !
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {userData?.isVerified && <a ref={ref2} id="save" onClick={Download}>
          <button className="inline-block self-center bg-blue-600 text-white font-bold rounded-lg px-6 py-3 shadow-md uppercase  text-sm hover:bg-blue-600 md:mt-5">
            Download
          </button>
        </a>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Download;
