import { Flex, Container,Text, Button } from "@chakra-ui/react";
import { useState, useEffect,useRef } from "react";

function PdfUploader() {
  const [File, setFile] = useState(null);
  const fileRef = useRef()
  const [FileInside, setFileInside] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    console.log("enter");
    // if(FileInside===false) setFileInside(true)
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files[0]);
    // setFileInside(true)
  };

  const handleDragLeave = () => {
    console.log("leave");
    // if(FileInside===true) setFileInside(false)
    // FileInside && setFileInside(false)
  };

  function formatString(fname) {
    if (fname.length >= 25)
      return (
        fname.slice(0, 20) + "..." + fname.slice(fname.length - 5, fname.length)
      );

    return fname;
  }
  return (
    <Container
      h="50%"
      w='100%'
      bg="#71717129"
      m="5px"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      rounded="20px"
    >
      <Flex  alignItems='center' justifyContent='center'  h='100%'>
        {!File ? (
          <Flex flexDirection='column' justifyContent='space-evenly' w="100%" h='100%' textAlign='center'>
            <Text> Drag and Drop Your File Here</Text>
            <span>or,</span>
            <input type="file" ref={fileRef} onChange={(event)=>setFile(event.target.files[0])} hidden/>
            <Button w='50%' marginX='auto' colorScheme='gray' onClick={()=>fileRef.current.click()}>Select File</Button>
          </Flex>
        ) : (
            <Flex flexDirection='column' justifyContent='space-evenly' w="100%" h='100%' textAlign='center'>
            <Text> {formatString(File?.name)}</Text>
            <Button w='50%' marginX='auto' colorScheme='red' onClick={()=>setFile(null)}>Delete File</Button>
            </Flex>
        )}
      </Flex>
    </Container>
  );
}

export default PdfUploader;
