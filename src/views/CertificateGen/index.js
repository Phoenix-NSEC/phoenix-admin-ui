import { useState,useEffect } from "react";
import { Button, Container, Flex, FormControl, FormHelperText, FormLabel, Input, Switch, Textarea } from "@chakra-ui/react";
import CsvUploader from "components/Uploads/CsvUploader";
import PdfUploader from "components/Uploads/PdfUploader";
import ImageUploader from "components/Uploads/ImageUploader";

const CertificateGen = () => {
  const [apiReqBody,setApiReqBody]= useState(
    {
      pdf: '',
      csv: '',
      img: '',
    })

    const [certCord,setCertCord] = useState({
        name:{
          x:0,
          y:0,
          font: 'arial',
          fontsize: 40,
          color: ''
        },
        id:{
          x:0,
          y:0,
          font: 'arial',
          fontsize: 15,
          color: ''
        }
      })
const [activeInputElementPos,setActiveInputElementPos] = useState({
  certname: false,
  certid: false
})

console.log(activeInputElementPos)
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
  <span onClick={()=>setActiveInputElementPos({certid:false,certname:true})}><Switch id='certname' isChecked={activeInputElementPos.certname} colorScheme='green' /></span> 
  
  </div>
  <div className="flex flex-col">
  X: {certCord.name.x} , Y: {certCord.name.y}
  <input id="font" className=" border-[.001rem] px-2 py-1 my-2 border-gray-500 " type="text" value={certCord.name.font} onChange={(e)=>setCertCord({...certCord,name:{...certCord.name,font:e.target.value}})} placeholder="Font" />
  <input id="fontsize" className="rounded border-[.001rem] px-2 py-1 border-gray-500 my-2" type="number" value={certCord.name.fontsize} onChange={(e)=>setCertCord({...certCord,name:{...certCord.name,fontsize:e.target.value}})} placeholder="Fontsize"/>
  <input type="color" value={certCord.name.color} onChange={(e)=>setCertCord({...certCord,name:{...certCord.name,color:e.target.value}})} />
  </div>
  <div className="flex mt-5 mb-2">
  <FormLabel htmlFor='email-alerts' mb='0'>
    Certificate Id
  </FormLabel>
  <span onClick={()=>setActiveInputElementPos({certid:true,certname:false})}> <Switch id='email-alerts' isChecked={activeInputElementPos.certid} colorScheme='green'/></span>
  </div>
  X: {certCord.id.x} , Y: {certCord.id.y}
  <div className="flex flex-col">
  <input id="font" className=" border-[.001rem] px-2 py-1 my-2 border-gray-500 " type="text" value={certCord.id.font} onChange={(e)=>setCertCord({...certCord,id:{...certCord.id,font:e.target.value}})} placeholder="Font" />
  <input id="fontsize" className="rounded border-[.001rem] px-2 py-1 border-gray-500 my-2" type="number" value={certCord.id.fontsize} onChange={(e)=>setCertCord({...certCord,id:{...certCord.id,fontsize:e.target.value}})} placeholder="Fontsize"/>
  <input type="color" value={certCord.id.color} onChange={(e)=>setCertCord({...certCord,id:{...certCord.id,color:e.target.value}})} />
  </div>
</FormControl>
  </div>
  <div className="w-[40%] h-[100%] ">
    <ImageUploader height='100%' File={apiReqBody} setFile={setApiReqBody} activeInput = {activeInputElementPos} setActiveInput={setActiveInputElementPos} data={certCord} setData={setCertCord}/>
  </div>
  </div>
</div>
  );
};

export default CertificateGen;
