import React, { useState, useEffect } from "react";
import {
  Image,
  Box,
  Flex,
  Input,
  Text,
  InputGroup,
  Button,
  FormLabel,
  FormControl,
  FormHelperText,
  ChakraProvider,
} from "@chakra-ui/react";
import phoenixBanner from "../../assets/img/phoenixBanner.png";
import FormInput from "components/FormInput";

import theme from "theme/theme";

const MembershipForm = () => {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [dept, setDept] = useState("");
  const [section, setSection] = useState("");
  const [studentId, setStudentId] = useState("");
  const [formInput, setFormInput] = useState({
    name: "",
    emailId: "",
    contactNo: "",
    whatsappNo: "",
    dept: "",
    section: "",
    studentId: "",
    studentPicture: "",
    transactionProof: "",
  });

  useEffect(() => {
    console.log(formInput);
  }, [formInput]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <form onSubmit={handleSubmit}>
        <Box minH="calc(100vh - 60px)" bg="#f1fffa" py="30px">
          <Flex direction="column" alignItems="center">
            <Image
              src={phoenixBanner}
              w="80vw"
              maxW="650px"
              margin="auto"
              borderRadius="10px"
              mb="20px"
            />
            <Box
              bg="white"
              p="20px"
              w="80vw"
              mb="10px"
              maxW="610px"
              borderRadius="10px"
              boxShadow="0px 0px 5px #00000021"
            >
              <Text color="black">Name</Text>
              <FormInput value={name} setValue={setName} />
            </Box>
            <Box
              bg="white"
              p="20px"
              w="80vw"
              mb="10px"
              maxW="610px"
              borderRadius="10px"
              boxShadow="0px 0px 5px #00000021"
            >
              <Text color="black">Email Id</Text>
              <FormInput
                variant="flushed"
                placeholder="Flushed"
                value={emailId}
                setValue={setEmailId}
              />
            </Box>
            <Box
              bg="white"
              p="20px"
              w="80vw"
              mb="10px"
              maxW="610px"
              borderRadius="10px"
              boxShadow="0px 0px 5px #00000021"
            >
              <Text color="black">WhatsApp No.</Text>
              <FormInput value={whatsappNo} setValue={setWhatsappNo} />
            </Box>
            <Box
              bg="white"
              p="20px"
              w="80vw"
              mb="10px"
              maxW="610px"
              borderRadius="10px"
              boxShadow="0px 0px 5px #00000021"
            >
              <Text color="black">Contact No.</Text>
              <FormInput value={contactNo} setValue={setContactNo} />
            </Box>
            <Box
              bg="white"
              p="20px"
              w="80vw"
              mb="10px"
              maxW="610px"
              borderRadius="10px"
              boxShadow="0px 0px 5px #00000021"
            >
              <Text color="black">Department</Text>
              <FormInput value={name} setValue={setName} />
            </Box>
            <Box
              bg="white"
              p="20px"
              w="80vw"
              mb="10px"
              maxW="610px"
              borderRadius="10px"
              boxShadow="0px 0px 5px #00000021"
            >
              <Text color="black">Section</Text>
              <FormInput value={section} setValue={setSection} />
            </Box>
            <Box
              bg="white"
              p="20px"
              w="80vw"
              mb="10px"
              maxW="610px"
              borderRadius="10px"
              boxShadow="0px 0px 5px #00000021"
            >
              <Text color="black">Student Id</Text>
              <FormInput value={studentId} setValue={setStudentId} />
            </Box>
            <Box
              bg="white"
              p="20px"
              w="80vw"
              mb="10px"
              maxW="610px"
              borderRadius="10px"
              boxShadow="0px 0px 5px #00000021"
            >
              <Text color="black">Your Picture</Text>
              <Input
                type="file"
                color="black"
                onChange={(event) => {
                  setFormInput({
                    ...formInput,
                    studentPicture: event.target.files[0],
                  });
                }}
              />
            </Box>
            <Box
              bg="white"
              p="20px"
              w="80vw"
              mb="10px"
              maxW="610px"
              borderRadius="10px"
              boxShadow="0px 0px 5px #00000021"
            >
              <Text color="black">Transaction Proof Screenshot</Text>
              <Input
                type="file"
                color="black"
                onChange={(event) => {
                  setFormInput({
                    ...formInput,
                    transactionProof: event.target.files[0],
                  });
                }}
              />
            </Box>
            <Box
              bg="white"
              p="20px"
              w="80vw"
              mb="10px"
              maxW="610px"
              borderRadius="10px"
              boxShadow="0px 0px 5px #00000021"
            >
              <Button
                loadingText="Submitting"
                colorScheme="blue"
                variant="solid"
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </Flex>
        </Box>
      </form>
    </ChakraProvider>
  );
};

export default MembershipForm;
