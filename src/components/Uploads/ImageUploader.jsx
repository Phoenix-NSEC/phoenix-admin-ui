import { Flex, Container,Text, Button } from "@chakra-ui/react";
import { useState, useEffect,useRef } from "react";

function ImageUploader({File,setFile,height}) {
  const fileRef = useRef()
  const [namePos,setNamePos] = useState({x:0,y:0})

  const handleSelectFile=(input)=>{
    setFile({...File,img:input.current.files[0]})
  }
  const handleDragOver = (event) => {
    event.preventDefault();
    console.log("enter");
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

  
  

  let rect = {
    x: 0,
    y: 0,
    width: 300,
    height: 20
  };
  useEffect(() => {
    var canvas = document.getElementById("cert");
    var ctx = canvas.getContext("2d");
    canvas.addEventListener("mousedown", startDrag)
    canvas.addEventListener("mousemove", drag);
    canvas.addEventListener("click", endDrag)
    
    let isDragging = true;
  function startDrag(event) {
    //  alert("startDrag")
      var mouseX = event.offsetX 
      var mouseY = event.offsetX
      rect.x = mouseX;
      rect.y = mouseY;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Redraw the rect
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
      // Check if the mouse is inside the rect
      // if (mouseX >= rect.x && mouseX <= rect.x + rect.width && mouseY >= rect.y && mouseY <= rect.y + rect.height) {
        // alert("clicked")
        isDragging = true;
      // }
    }
  
    function drag(event) {
      if (isDragging) {
        setNamePos({
          x: event.offsetX ,
          y: event.offsetY 
        })
        var mouseX = event.offsetX ;
        var mouseY = event.offsetY ;
  
        // Update the rect's x and y coordinates
        rect.x = mouseX;
        rect.y = mouseY;
  
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        // Redraw the rect
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
      }
    }
  
    function endDrag() {
      console.log("endDrag")
      isDragging = false;
    }
    // Event listeners for mouse events

  
    // Draw the rect on the canvas
    var img = new Image();
    const reader = new FileReader();
    File.img && reader.readAsDataURL(File?.img)
    reader.addEventListener('load', function(e) {
      img.src = reader.result;
    });
    img.onload = function() {
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        // Add text to the image
        ctx.font = "40px poppins";
        ctx.fillStyle = "#CBA04F";
        ctx.fillText("Kallyan Singha", 263, 259);
        ctx.font = "15px poppins";
        ctx.fillStyle = "#CBA04F";
        ctx.fillText("CERT67PH02", 113, 480);
    }

    
    return()=>{
      canvas.removeEventListener("mousedown", startDrag);
      canvas.removeEventListener("mousemove", drag);
      canvas.removeEventListener("mouseout", endDrag)
    }
  }, [File,namePos])
  return (
    <div className="h-[100%] bg-[#71717129] w-[100%]  border-slate-500 border-[.0005rem] rounded-2xl p-5"
    onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
  x: {namePos.x} , y: {namePos.y}
      
      <Flex  alignItems='center' justifyContent='center'  h='100%'>
        {!File.img ? (
          <Flex flexDirection='column' justifyContent='space-evenly' w="100%" h='100%' textAlign='center'>
            <canvas height={300} width={600} id="cert" className="bg-gray-200/10"/>
            <Text> Drag and Drop .png File Here</Text>
            <span>OR</span>
            <input type="file" ref={fileRef} onChange={()=>handleSelectFile(fileRef)} hidden/>
            <Button w='50%' marginX='auto' colorScheme='gray' onClick={()=>fileRef.current.click()}>Select File</Button>
          </Flex>
        ) : (
          <Flex flexDirection='column' justifyContent='space-evenly' w="100%" h='100%' textAlign='center'>
              <canvas height={500} width={800} id="cert" className="bg-green-500 cursor-text"/>
            <Text> {formatString(File?.img?.name)}</Text>
            <Button w='50%' marginX='auto' colorScheme='red' onClick={()=>setFile({...File,img:''})}>Delete File</Button>
            </Flex>
        )}
      </Flex>
      </div>
  );
}

export default ImageUploader;
