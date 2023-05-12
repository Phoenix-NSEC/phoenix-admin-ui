import React, { useEffect, useState, useRef } from "react";
import {
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

import qrcode from 'qrcode';
import { collection, getDocs, query, where } from "firebase/firestore";
// import { auth, db, maindb } from "../firebaseConf";
import axios from "axios";
import { db, maindb, auth } from "firebaseConfig";
import { certdb } from "firebaseConfig";


const Download = ({ email }) => {
  const [userData, setUserData] = useState();
  const [idCard, setIdcard] = useState();
  const [CertLoading, setCertloading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();


  let canvas;
  let ctx;
  const img = new Image();
  const avatar = new Image();
  const qrCodeImage = new Image();


  const ref1 = useRef();
  const ref2 = useRef();

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
  function formatedName(fullName) {
    return fullName.replace(/ /g, '_');
  }

  const IdDownload = async (canvas,name) => {
    var link = ref2?.current;
    link.href = canvas?.toDataURL();
    link.download = `${formatedName(name)}_Phoenix_Membershipcard.png`; //name of the downloaded certificate
  };

  useEffect(() => {
    setTimeout(() => {
      if (userData?.isVerified && ref1.current) {
        canvas = ref1.current;
       
        ctx = canvas.getContext("2d");
      }
  
      async function renderImage() {
        if (userData && idCard) {
          img.src = await getImageAsBase64(idCard?.url); // change url
          avatar.src = await getImageAsBase64(userData.profilePic);
          const qrCodeText = userData.id;
          const qrCodeOptions = {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            quality: 0.92,
            margin: 1,
            color: {
              dark: '#000000FF',
              light: '#FFFFFFFF'
            }
          };
          const qrCodeImageSrc = await qrcode.toDataURL(qrCodeText, qrCodeOptions);
          qrCodeImage.src = qrCodeImageSrc;
          setCertloading(false);
        }
      }
  
      renderImage();
  
      img.onload = function () {
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Add text to the image
        if (userData && ctx) {
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
          avatar.onload = () => {
            ctx?.drawImage(
              avatar,
              idCard.image.x,
              idCard.image.y,
              idCard.image.w,
              idCard.image.h
            );
          };
          console.log(idCard)
          qrCodeImage.onload = () => {
            ctx?.drawImage(
              qrCodeImage,
              idCard.qr.x,
              idCard.qr.y,
              idCard.qr.w,
              idCard.qr.h
            );
          };
        }
      };
      


    }, 200);
  }, [isOpen]);

  function getSession(year) {
    let gradYear = +year;
    let startYear = gradYear - 4;
    return `${startYear}-${gradYear}`;
  }

  useEffect(() => {
    fetchUserData(email);
  },[isOpen]);

  return (
    <>
      <Button onClick={onOpen}>Download</Button>

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent maxW="620px" maxH="500px">
          <ModalBody maxH="370px">
            {userData && userData?.isVerified ? (
              <div
                className={`xsm:scale-[.4] md:scale-[1]`}
              >
                <canvas
                  ref={ref1}
                  className="canvas"
                  height="500"
                  width="800"
                  style={{transform: "scale(0.7)", transformOrigin: "left top"}}
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
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            {userData?.isVerified && <a ref={ref2} id="save" onClick={()=>IdDownload(ref1.current,userData.name)}>
          <Button colorScheme="blue" mr={3}>
            Download
          </Button>
        </a>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Download;
