import React from "react";
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
import { all } from "axios";

function PopUp({ paymentSs, uniqueId, index, name, allData, setAllData }) {

    //console.log(allData[index]);

    const onVerify = ()=>{
        allData[index].isVerified = true;
        const newData = [...allData];
        
        setAllData(newData);
        onClose();
    }

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>View</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalHeader>#{uniqueId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img src={paymentSs} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" color="green.400" onClick={onVerify} >Verify</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PopUp;
