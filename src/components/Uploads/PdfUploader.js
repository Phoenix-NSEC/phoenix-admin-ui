import { Flex, Container,Text, Button } from "@chakra-ui/react";
import { useState, useEffect,useRef } from "react";

function PdfUploader({File,setFile}) {
  const fileRef = useRef()

  const handleSelectFile=(input)=>{
    setFile({...File,pdf:input.current.files[0]})
  }
  const handleDragOver = (event) => {
    event.preventDefault();
    console.log("enter");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile({...File,pdf:event.dataTransfer.files[0]});
  };

  const handleDragLeave = () => {
    console.log("leave");
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
      border="1px dotted gray"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      rounded="20px"
    >
      <Flex  alignItems='center' justifyContent='center'  h='100%'>
        {!File.pdf ? (
          <Flex flexDirection='column' justifyContent='space-evenly' w="100%" h='100%' textAlign='center'>
            <Text> Drag and Drop .pdf File Here</Text>
            <span>OR</span>
            <input type="file" ref={fileRef} onChange={()=>handleSelectFile(fileRef)} hidden/>
            <Button w='50%' marginX='auto' colorScheme='gray' onClick={()=>fileRef.current.click()}>Select File</Button>
          </Flex>
        ) : (
            <Flex flexDirection='column' justifyContent='space-evenly' w="100%" h='100%' textAlign='center'>
            <Text> {formatString(File?.pdf?.name)}</Text>
            <Button w='50%' marginX='auto' colorScheme='red' onClick={()=>setFile({...File,pdf:''})}>Delete File</Button>
            </Flex>
        )}
      </Flex>
    </Container>
  );
}

export default PdfUploader;
