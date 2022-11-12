import { Flex, Container, Text, Button } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

function CsvUploader({ height, File, setFile }) {
  const fileRef = useRef();

  const handleSelectFile = (input) => {
    setFile({ ...File, csv: input.current.files[0] });
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    console.log("enter");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile({ ...File, csv: event.dataTransfer.files[0] });
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
      h={height ? height : "50%"}
      bg="#ffffff1f"
      m="5px"
      border="1px dotted gray"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      rounded="20px"
    >
      <Flex alignItems="center" justifyContent="center" h="100%">
        {!File.csv ? (
          <Flex
            flexDirection="column"
            justifyContent="space-evenly"
            w="100%"
            h="100%"
            textAlign="center"
          >
            <Text> Drag and Drop .csv File Here</Text>
            <span>OR</span>
            <input
              type="file"
              ref={fileRef}
              onChange={() => handleSelectFile(fileRef)}
              hidden
            />
            <Button
              w="50%"
              marginX="auto"
              colorScheme="gray"
              onClick={() => fileRef.current.click()}
            >
              Select File
            </Button>
          </Flex>
        ) : (
          <Flex
            flexDirection="column"
            justifyContent="space-evenly"
            w="100%"
            h="100%"
            textAlign="center"
          >
            <Text> {formatString(File?.csv?.name)}</Text>
            <Button
              w="50%"
              marginX="auto"
              colorScheme="red"
              onClick={() => setFile({ ...File, csv: "" })}
            >
              Delete File
            </Button>
          </Flex>
        )}
      </Flex>
    </Container>
  );
}

export default CsvUploader;
