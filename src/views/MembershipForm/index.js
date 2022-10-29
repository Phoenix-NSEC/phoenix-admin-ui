import React from 'react'
import { Image, Box, Flex, Input, Text, InputGroup } from '@chakra-ui/react'
import phoenixBanner from "../../assets/img/phoenixBanner.png"
import FormInput from 'components/FormInput'
import { useState } from 'react'

const MembershipForm = () => {
    const [name, setName] = useState("")
    const [emailId, setEmailId] = useState("")
    const [contactNo, setContactNo] = useState("")
    const [whatsappNo, setWhatsappNo] = useState("")
    const [dept, setDept] = useState("")
    const [section, setSection] = useState("")
    const [studentId, setStudentId] = useState("")

    return (
        <Box minH="calc(100vh - 60px)" bg="#f1fffa" py="30px">
            <Flex direction="column" alignItems="center">
                <Image src={phoenixBanner} w="80vw" maxW="650px" margin="auto" borderRadius="10px" mb="20px" />
                <Box bg="white" p="20px" w="80vw" mb="10px" maxW="610px" borderRadius="10px" boxShadow="0px 0px 5px #00000021">
                    <Text>
                        Name
                    </Text>
                    <FormInput value={name} setValue={setName} />
                </Box>
                <Box bg="white" p="20px" w="80vw" mb="10px" maxW="610px" borderRadius="10px" boxShadow="0px 0px 5px #00000021">
                    <Text>
                        Email Id
                    </Text>
                    <FormInput value={emailId} setValue={setEmailId} />
                </Box>
                <Box bg="white" p="20px" w="80vw" mb="10px" maxW="610px" borderRadius="10px" boxShadow="0px 0px 5px #00000021">
                    <Text>
                        WhatsApp No.
                    </Text>
                    <FormInput value={whatsappNo} setValue={setWhatsappNo} />
                </Box>
                <Box bg="white" p="20px" w="80vw" mb="10px" maxW="610px" borderRadius="10px" boxShadow="0px 0px 5px #00000021">
                    <Text>
                        Contact No.
                    </Text>
                    <FormInput value={contactNo} setValue={setContactNo} />
                </Box>
                <Box bg="white" p="20px" w="80vw" mb="10px" maxW="610px" borderRadius="10px" boxShadow="0px 0px 5px #00000021">
                    <Text>
                        Department
                    </Text>
                    <FormInput value={name} setValue={setName} />
                </Box>
                <Box bg="white" p="20px" w="80vw" mb="10px" maxW="610px" borderRadius="10px" boxShadow="0px 0px 5px #00000021">
                    <Text>
                        Section
                    </Text>
                    <FormInput value={section} setValue={setSection} />
                </Box>
                <Box bg="white" p="20px" w="80vw" mb="10px" maxW="610px" borderRadius="10px" boxShadow="0px 0px 5px #00000021">
                    <Text>
                        Student Id
                    </Text>
                    <FormInput value={studentId} setValue={setStudentId} />
                </Box>
                <Box bg="white" p="20px" w="80vw" mb="10px" maxW="610px" borderRadius="10px" boxShadow="0px 0px 5px #00000021">
                    <Text>
                        Your Picture
                    </Text>
                </Box>
                <Box bg="white" p="20px" w="80vw" mb="10px" maxW="610px" borderRadius="10px" boxShadow="0px 0px 5px #00000021">
                    <Text>
                        Transaction Proof Screenshot
                    </Text>
                </Box>
            </Flex>
        </Box>
    )
}

export default MembershipForm
