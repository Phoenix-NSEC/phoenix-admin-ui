import { useState,useEffect } from "react";
import { Button, Container, Flex, FormControl, FormHelperText, FormLabel, Input, Switch, Textarea } from "@chakra-ui/react";
import CsvUploader from "components/Uploads/CsvUploader";
import PdfUploader from "components/Uploads/PdfUploader";
import ImageUploader from "components/Uploads/ImageUploader";

const CertificateGen = () => {
  const [apiReqBody,setApiReqBody]= useState(
    {
      pdf: '',
      csv: ''
    }
  )

  useEffect(()=>{
    console.log(apiReqBody)
  },[apiReqBody])
  return (
<div className="h-[93vh] w-[100%] flex flex-col">
  <div className="flex flex-row h-[100%]">

<div className="w-[60%] h-[100%]  ">
<FormControl width="70%">
  <FormLabel>Event Name</FormLabel>
  <Input type='eventName' />
  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
  <div className="flex mt-5 mb-2">
  <FormLabel htmlFor='email-alerts' mb='0'>
    Particepent Name
  </FormLabel>
  <Switch id='email-alerts' colorScheme='green' />
  </div>
  X: 0 , Y: 0
  <div className="flex mt-5 mb-2">
  <FormLabel htmlFor='email-alerts' mb='0'>
    Certificate Id
  </FormLabel>
  <Switch id='email-alerts'  colorScheme='green'/>
  </div>
  X: 0 , Y: 0
</FormControl>
  </div>
  <div className="w-[40%] h-[100%] ">
    <ImageUploader height='100%' File={apiReqBody} setFile={setApiReqBody}/>
  </div>
  </div>
       
      <Button w='20%' mt='20px' mx="25px">Upload File</Button>
</div>
  );
};

export default CertificateGen;
