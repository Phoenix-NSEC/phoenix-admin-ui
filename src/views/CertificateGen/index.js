import { useState,useEffect } from "react";
import { Button, Container, Flex, FormControl, FormHelperText, FormLabel, Input, Switch, Textarea } from "@chakra-ui/react";
import CsvUploader from "components/Uploads/CsvUploader";
import csvtojson from 'csvtojson'
import ImageUploader from "components/Uploads/ImageUploader";

const CertificateGen = () => {
  const [files,setfiles]= useState(
    {
      pdf: '',
      csv: '',
      img: '',
    })

    const [certCord,setCertCord] = useState({
        name:{
          xAxis:0,
          yAxis:0,
          fontName: 'arial',
          fontSize: 40,
          fontColor: ''
        },
        cId:{
          xAxis:0,
          yAxis:0,
          fontName: 'arial',
          fontSize: 15,
          fontColor: ''
        }
      })
const [activeInputElementPos,setActiveInputElementPos] = useState({
  certname: false,
  certid: false
})

const [eventDetails,setEventDetails] =useState({
  name: '',
  date:'',
  listParticipants: []
})

useEffect(()=>{
  console.log(files.csv)
  const reader = new FileReader();
  if(files.csv)
  {
    reader.readAsText(files.csv)
    reader.onload = function () {
      const csvString = reader.result;
      csvtojson()
        .fromString(csvString)
        .then((csvJson) => {
          // const jsonString = JSON.stringify(csvJson);
          setEventDetails({...eventDetails,listParticipants:csvJson})
        })
        .catch(err=>console.log(err));
    };
   
  }
},[files.csv])


  return (
<div className="h-[93vh] w-[100%] flex flex-col">
  <div className="flex flex-row h-[100%]">

<div className="w-[60%] h-[100%]  ">
<FormControl width="70%" height="100%">
  <FormLabel>Event Name</FormLabel>
  <Input type='eventName' value={eventDetails.name} onChange={(e)=>setEventDetails({...eventDetails,name:e.target.value})} />
  <div className="flex mt-5 mb-2">
  <FormLabel mb='0'>
    Participant Name Position
  </FormLabel>
  <span onClick={()=>setActiveInputElementPos({certid:false,certname:true})}><Switch id='certname' isChecked={activeInputElementPos.certname} colorScheme='green' /></span> 
  
  </div>
  <div className="flex flex-col">
  X: {certCord.name.xAxis} , Y: {certCord.name.yAxis}
  <input id="font" className=" border-[.001rem] px-2 py-1 my-2 border-gray-500 " type="text" value={certCord.name.fontName} onChange={(e)=>setCertCord({...certCord,name:{...certCord.name,fontName:e.target.value}})} placeholder="Font" />
  <input id="fontsize" className="rounded border-[.001rem] px-2 py-1 border-gray-500 my-2" type="number" value={certCord.name.fontSize} onChange={(e)=>setCertCord({...certCord,name:{...certCord.name,fontSize:e.target.value}})} placeholder="Fontsize"/>
  <input type="color" value={certCord.name.fontColor} onChange={(e)=>setCertCord({...certCord,name:{...certCord.name,fontColor:e.target.value}})} />
  </div>
  <div className="flex mt-5 mb-2">
  <FormLabel htmlFor='email-alerts' mb='0'>
    Certificate Id Position
  </FormLabel>
  <span onClick={()=>setActiveInputElementPos({certid:true,certname:false})}> <Switch id='email-alerts' isChecked={activeInputElementPos.certid} colorScheme='green'/></span>
  </div>
  X: {certCord.cId.xAxis} , Y: {certCord.cId.yAxis}
  <div className="flex flex-col">
  <input id="font" className=" border-[.001rem] px-2 py-1 my-2 border-gray-500 " type="text" value={certCord.cId.fontName} onChange={(e)=>setCertCord({...certCord,cId:{...certCord.cId,fontName:e.target.value}})} placeholder="Font" />
  <input id="fontsize" className="rounded border-[.001rem] px-2 py-1 border-gray-500 my-2" type="number" value={certCord.cId.fontSize} onChange={(e)=>setCertCord({...certCord,cId:{...certCord.cId,fontSize:e.target.value}})} placeholder="Fontsize"/>
  <input type="color" value={certCord.cId.fontColor} onChange={(e)=>setCertCord({...certCord,cId:{...certCord.cId,fontColor:e.target.value}})} />
  </div>
  <div className="flex flex-col mt-5 mb-2">

  <FormLabel>Event Date</FormLabel>
  <Input type='date' value={eventDetails.date} onChange={(e)=>setEventDetails({...eventDetails,date:e.target.value})} />
  </div>
  <div className="flex flex-col mt-5 mb-2 h-[300px]">

  <FormLabel>Participants List</FormLabel>
  <CsvUploader height="100%"  File={files} setFile={setfiles}/>
  </div>
</FormControl>
  </div>
  <div className="w-[40%] h-[100%] ">
    <ImageUploader height='100%' File={files} setFile={setfiles} activeInput = {activeInputElementPos} setActiveInput={setActiveInputElementPos} data={certCord} setData={setCertCord} eventdetails={eventDetails}/>
  </div>
  </div>
</div>
  );
};

export default CertificateGen;
