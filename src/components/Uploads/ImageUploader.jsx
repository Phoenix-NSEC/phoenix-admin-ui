import { Flex, Container,Text, Button } from "@chakra-ui/react";
import { useState, useEffect,useRef } from "react";
import { uploadCertficateAdmin } from "utils/firebaseFxns/certificates";
import { getFirestore, Timestamp, doc, setDoc,collection, query, where,getDocs } from "firebase/firestore";
import { cert } from "firebaseConfig";


function ImageUploader({File,setFile,activeInput,setActiveInput,setData,data,eventdetails}) {
  const fileRef = useRef()

  const handleSelectFile=(input)=>{
    setFile({...File,img:input.current.files[0]})
  }
  const handleDragOver = (event) => {
    event.preventDefault();
  
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile({...File,img:event.dataTransfer.files[0]});
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

 
  
  function drag(event) {
   if(activeInput.certname)
   {
    setData({
      ...data,
        name:{
          ...data.name,
          xAxis: event.offsetX ,
          yAxis: event.offsetY+80
        }
      })
   }
   

if(activeInput.certid) 
{
  setData({
    ...data,
      cId:{
        ...data.cId,
        xAxis: event.offsetX ,
        yAxis: event.offsetY+135 
      }
    })
     }
}

function stopDrag(){
  setActiveInput({
    certname:false,
    certid:false
  })
}

console.log(activeInput)
  useEffect(() => {
   
    var canvas = document.getElementById("cert");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    const reader = new FileReader();
    File.img && reader.readAsDataURL(File?.img)
    reader.addEventListener('load', function(e) {
      img.src = reader.result;
    });
    File?.img && canvas.addEventListener("mousemove", drag);
    canvas.addEventListener("mousedown",stopDrag)
 
  
  

    
    img.onload = function() {
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.font = `${data.name.fontSize}px ${data.name.fontName}`;
        ctx.fillStyle = data.name.fontColor;
        ctx.fillText("Yout Name Here", data.name.xAxis, data.name.yAxis);
        ctx.font = `${data.cId.fontSize}px ${data.cId.fontName}`;
        ctx.fillStyle = data.cId.fontColor;
         ctx.fillText("CERT67PH02", data.cId.xAxis, data.cId.yAxis);
    }

    
    return()=>{
      canvas.removeEventListener("mousemove", drag);
      canvas.removeEventListener("mousedown",stopDrag)
    }
  }, [File,activeInput,data])

const users =[
  {
    name: "kallyan singha",
    email: "kallyan@apiffer.in"
  },
  {
    name: "shreyam maity",
    email: "shreyam@apiffer.in"
  }
]
console.log(eventdetails.listParticipants)

const submitCert =()=>{
  const db = getFirestore(cert);
  var q = query(collection(db, "certMetas"), where("name", "==", eventdetails.name))
  await getDocs(q).then(async(snapshot) => {
if (snapshot.empty) {
console.log("No matching documents");
  var isDone = await uploadCertficateAdmin(File.img,data.name,data.cId,eventdetails.name,eventdetails.date,'admin',eventdetails.listParticipants)
  if(isDone){
    alert("Uploaded");
  }else{
    alert("Failed");
  }
}else{
  alert("A certificate with same name exists")
}}).catch(err => {
  console.log("Error getting documents", err);
});
}



  return (
    <div className="h-[100%] bg-[#71717129] w-[100%]  border-slate-500 border-[.0005rem] rounded-2xl p-5"
    onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >

      
      <Flex  alignItems='center' justifyContent='center'  h='100%'>
        {!File.img ? (
          <Flex flexDirection='column' justifyContent='space-evenly' w="100%" h='100%' textAlign='center'>
            <canvas height="500px" width="800px" id="cert" className="bg-gray-200/10"/>
            <Text> Drag and Drop .png File Here</Text>
            <span>OR</span>
            <input type="file" ref={fileRef} onChange={()=>handleSelectFile(fileRef)} hidden/>
            <Button w='50%' marginX='auto' colorScheme='gray' onClick={()=>fileRef.current.click()}>Select File</Button>
          </Flex>
        ) : (
          <Flex flexDirection='column' justifyContent='space-evenly' w="100%" h='100%' textAlign='center'>
              <canvas height="500px" width="800px" id="cert" className="bg-green-500 cursor-pointer"/>
            <Text> {formatString(File?.img?.name)}</Text>
            <Button w='50%' marginX='auto' colorScheme='red' onClick={()=>setFile({...File,img:''})}>Delete File</Button>
            <Button w='50%' marginX='auto' colorScheme='blue' onClick={submitCert}>Upload Certificate</Button>
            </Flex>
        )}
      </Flex>
      </div>
  );
}

export default ImageUploader;
