import { Button, Container, Flex, Textarea } from "@chakra-ui/react";
import CsvUploader from "components/Uploads/CsvUploader";
import PdfUploader from "components/Uploads/PdfUploader";

const CertificateGen = () => {
  return (
    <Flex
      flexDirection="column"
      w="100%"
      h="100%"
      pt={{ base: "120px", md: "75px" }}
    >
    <Flex
      flexDirection="row"
      w="100%"
      h="100%"
    >
      
      <Container w="50%" h="70vh" p={0} >
      <Textarea placeholder="Html Here" size="lg" resize="none" height='100%' rounded="20px"/>
      </Container>
      <Container w="50%" h="70vh" p={0}>
        <Flex h="100%" flexDirection="column">
         <PdfUploader/>
         <CsvUploader/>
        </Flex>
      </Container>
    </Flex>
    <Button w='20%' mt='20px' mx="25px">Upload File</Button>
    </Flex>
  );
};

export default CertificateGen;
