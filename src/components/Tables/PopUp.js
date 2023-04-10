import React from "react";
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
import { all } from "axios";
import { verifyUser } from "utils/firebaseFxns/verification";

function PopUp({
  email,
  logo,
  paymentSs,
  uniqueId,
  index,
  name,
  allData,
  setAllData,
  setUserStatus,
  userStatus,
}) {
  const onVerify = async () => {
    allData[index].isVerified = true;
    console.log(uniqueId);
    var isDone = await verifyUser(email, uniqueId);
    if (!isDone) {
      console.log("error");
      return;
    } else {
      console.log("done");
      const newData = [...allData];
      let stat = {
        verified: (userStatus.verified += 1),
        notVerified: (userStatus.notVerified -= 1),
      };
      setUserStatus(stat);
      setAllData(newData);
      onClose();
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>View</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Flex>
            <ModalBody>
              <Avatar src={logo} width={50} height={50} />
            </ModalBody>
            <ModalHeader position="absolute" top="-1%" left="14%">
              {name}
              <Text fontSize={12}>#{uniqueId}</Text>
            </ModalHeader>
          </Flex>
          <ModalCloseButton />
          <ModalBody>
            <img src={paymentSs} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" color="green.400" onClick={onVerify}>
              Verify
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PopUp;
