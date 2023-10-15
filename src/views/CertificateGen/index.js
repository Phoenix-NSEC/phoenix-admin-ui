import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import CsvUploader from "components/Uploads/CsvUploader";
import csvtojson from "csvtojson";
import ImageUploader from "components/Uploads/ImageUploader";

const CertificateGen = () => {
  const [files, setfiles] = useState({
    pdf: "",
    csv: "",
    img: "",
  });

  const [certCord, setCertCord] = useState({
    name: {
      xAxis: 0,
      yAxis: 0,
      fontName: "arial",
      fontSize: 40,
      fontColor: "",
    },
    cId: {
      xAxis: 0,
      yAxis: 0,
      fontName: "arial",
      fontSize: 15,
      fontColor: "",
    },
    Id: {
      xAxis: 0,
      yAxis: 0,
      fontName: "arial",
      fontSize: 30,
      fontColor: "",
    },
    ses: {
      xAxis: 0,
      yAxis: 0,
      fontName: "arial",
      fontSize: 15,
      fontColor: "",
    },
    dep: {
      xAxis: 0,
      yAxis: 0,
      fontName: "arial",
      fontSize: 15,
      fontColor: "",
    },
  });
  const [activeInputElementPos, setActiveInputElementPos] = useState({
    certname: false,
    certid: false,
    ses:false,
    dep:false,
    id:false
  });

  const [eventDetails, setEventDetails] = useState({
    name: "",
    date: "",
    id:"",
    ses:"",
    dep:"",
    listParticipants: [],
  });

  useEffect(() => {
    console.log(files.csv);
    const reader = new FileReader();
    if (files.csv) {
      reader.readAsText(files.csv);
      reader.onload = function () {
        const csvString = reader.result;
        csvtojson()
          .fromString(csvString)
          .then((csvJson) => {
            // const jsonString = JSON.stringify(csvJson);
            setEventDetails({ ...eventDetails, listParticipants: csvJson });
          })
          .catch((err) => console.log(err));
      };
    }
  }, [files.csv]);

  return (
    <div className="h-[93vh] w-[100%] flex flex-col">
      <div className="flex flex-row h-[100%]">
        <div className="w-[60%] h-[100%]  ">
          <FormControl width="70%" height="100%">
            <FormLabel>Event Name</FormLabel>
            <Input
              type="eventName"
              value={eventDetails.name}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, name: e.target.value })
              }
            />
            <div className="flex mt-5 mb-2">
              <FormLabel mb="0">Participant Name Position</FormLabel>
              <span
                onClick={() =>
                  setActiveInputElementPos({ certid: false, certname: true })
                }
              >
                <Switch
                  id="certname"
                  isChecked={activeInputElementPos.certname}
                  colorScheme="green"
                />
              </span>
            </div>
            <div className="flex flex-col">
              X: {certCord.name.xAxis} , Y: {certCord.name.yAxis}
              <div className="">
                X:{" "}
                <input
                  id="x"
                  className="mr-2 border-[.001rem] px-2 py-1 my-2 border-gray-500 "
                  type="number"
                  value={certCord.name.xAxis}
                  onChange={(e) =>
                    setCertCord({
                      ...certCord,
                      name: { ...certCord.name, xAxis: e.target.value },
                    })
                  }
                  placeholder="X"
                />

                Y:{" "}
                <input
                  id="y"
                  className="border-[.001rem] px-2 py-1 my-2 border-gray-500 "
                  type="number"
                  value={certCord.name.yAxis}
                  onChange={(e) =>
                    setCertCord({
                      ...certCord,
                      name: { ...certCord.name, yAxis: e.target.value },
                    })
                  }
                  placeholder="Y"
                />
              </div>
              <input
                id="font"
                className=" border-[.001rem] px-2 py-1 my-2 border-gray-500 "
                type="text"
                value={certCord.name.fontName}
                onChange={(e) =>
                  setCertCord({
                    ...certCord,
                    name: { ...certCord.name, fontName: e.target.value },
                  })
                }
                placeholder="Font"
              />
              <input
                id="fontsize"
                className="rounded border-[.001rem] px-2 py-1 border-gray-500 my-2"
                type="number"
                value={certCord.name.fontSize}
                onChange={(e) =>
                  setCertCord({
                    ...certCord,
                    name: { ...certCord.name, fontSize: e.target.value },
                  })
                }
                placeholder="Fontsize"
              />
              <input
                type="color"
                value={certCord.name.fontColor}
                onChange={(e) =>
                  setCertCord({
                    ...certCord,
                    name: { ...certCord.name, fontColor: e.target.value },
                  })
                }
              />
            </div>
            <div className="flex mt-5 mb-2">
              <FormLabel htmlFor="email-alerts" mb="0">
                ID Position
              </FormLabel>
              <span
                onClick={() =>
                  setActiveInputElementPos({ ...activeInputElementPos, id:true  })
                }
              >
                {" "}
                <Switch
                  id="email-alerts"
                  isChecked={activeInputElementPos.id}
                  colorScheme="green"
                />
              </span>
            </div>
            X: {certCord.Id.xAxis} , Y: {certCord.Id.yAxis}
            <div className="">
            X: <input id="x" className="mr-2 border-[.001rem] px-2 py-1 my-2 border-gray-500 " type="number" value={certCord.Id.xAxis} onChange={(e) => setCertCord({...certCord, Id: {...certCord.Id, xAxis: e.target.value}})} placeholder="X" />
Y: <input id="y" className="border-[.001rem] px-2 py-1 my-2 border-gray-500 " type="number" value={certCord.Id.yAxis} onChange={(e) => setCertCord({...certCord, Id: {...certCord.Id, yAxis: e.target.value}})} placeholder="Y" />

            </div>
            <div className="flex flex-col">
              <input
                id="font"
                className=" border-[.001rem] px-2 py-1 my-2 border-gray-500 "
                type="text"
                value={certCord.Id.fontName}
                onChange={(e) =>
                  setCertCord({
                    ...certCord,
                    Id: { ...certCord.Id, fontName: e.target.value },
                  })
                }
                placeholder="Font"
              />
              <input
                id="fontsize"
                className="rounded border-[.001rem] px-2 py-1 border-gray-500 my-2"
                type="number"
                value={certCord.Id.fontSize}
                onChange={(e) =>
                  setCertCord({
                    ...certCord,
                    Id: { ...certCord.Id, fontSize: e.target.value },
                  })
                }
                placeholder="Fontsize"
              />
              <input
                type="color"
                value={certCord.Id.fontColor}
                onChange={(e) =>
                  setCertCord({
                    ...certCord,
                    Id: { ...certCord.Id, fontColor: e.target.value },
                  })
                }
              />
            </div>
            <div className="flex mt-5 mb-2">
              <FormLabel htmlFor="email-alerts" mb="0">
                Session Position
              </FormLabel>
              <span
                onClick={() =>
                  setActiveInputElementPos({ ...activeInputElementPos, ses:true })
                }
              >
                {" "}
                <Switch
                  id="email-alerts"
                  isChecked={activeInputElementPos.ses}
                  colorScheme="green"
                />
              </span>
            </div>
            X: {certCord.ses.xAxis} , Y: {certCord.ses.yAxis}
            <div className="">
            X: <input id="x" className="mr-2 border-[.001rem] px-2 py-1 my-2 border-gray-500 " type="number" value={certCord.ses.xAxis} onChange={(e) => setCertCord({...certCord, ses: {...certCord.ses, xAxis: e.target.value}})} placeholder="X" />
Y: <input id="y" className="border-[.001rem] px-2 py-1 my-2 border-gray-500 " type="number" value={certCord.ses.yAxis} onChange={(e) => setCertCord({...certCord, ses: {...certCord.ses, yAxis: e.target.value}})} placeholder="Y" />

            </div>
            <div className="flex flex-col">
              <input
                id="font"
                className=" border-[.001rem] px-2 py-1 my-2 border-gray-500 "
                type="text"
                value={certCord.ses.fontName}
                onChange={(e) =>
                  setCertCord({
                    ...certCord,
                    ses: { ...certCord.ses, fontName: e.target.value },
                  })
                }
                placeholder="Font"
              />
              <input
                id="fontsize"
                className="rounded border-[.001rem] px-2 py-1 border-gray-500 my-2"
                type="number"
                value={certCord.ses.fontSize}
                onChange={(e) =>
                  setCertCord({
                    ...certCord,
                    ses: { ...certCord.ses, fontSize: e.target.value },
                  })
                }
                placeholder="Fontsize"
              />
              <input
                type="color"
                value={certCord.ses.fontColor}
                onChange={(e) =>
                  setCertCord({
                    ...certCord,
                    ses: { ...certCord.ses, fontColor: e.target.value },
                  })
                }
              />
            </div>
            <div className="flex mt-5 mb-2">
              <FormLabel htmlFor="email-alerts" mb="0">
                Department Position
              </FormLabel>
              <span
                onClick={() =>
                  setActiveInputElementPos({ ...activeInputElementPos, dep:true })
                }
              >
                {" "}
                <Switch
                  id="email-alerts"
                  isChecked={activeInputElementPos.dep}
                  colorScheme="green"
                />
              </span>
            </div>
            X: {certCord.dep.xAxis} , Y: {certCord.dep.yAxis}
            <div className="">
            X: <input id="x" className="mr-2 border-[.001rem] px-2 py-1 my-2 border-gray-500 " type="number" value={certCord.dep.xAxis} onChange={(e) => setCertCord({...certCord, dep: {...certCord.dep, xAxis: e.target.value}})} placeholder="X" />
Y: <input id="y" className="border-[.001rem] px-2 py-1 my-2 border-gray-500 " type="number" value={certCord.dep.yAxis} onChange={(e) => setCertCord({...certCord, dep: {...certCord.dep, yAxis: e.target.value}})} placeholder="Y" />

            </div>
            <div className="flex flex-col">
              <input
                id="font"
                className=" border-[.001rem] px-2 py-1 my-2 border-gray-500 "
                type="text"
                value={certCord.dep.fontName}
                onChange={(e) =>
                  setCertCord({
                    ...certCord,
                    dep: { ...certCord.dep, fontName: e.target.value },
                  })
                }
                placeholder="Font"
              />
              <input
                id="fontsize"
                className="rounded border-[.001rem] px-2 py-1 border-gray-500 my-2"
                type="number"
                value={certCord.dep.fontSize}
                onChange={(e) =>
                  setCertCord({
                    ...certCord,
                    dep: { ...certCord.dep, fontSize: e.target.value },
                  })
                }
                placeholder="Fontsize"
              />
              <input
                type="color"
                value={certCord.dep.fontColor}
                onChange={(e) =>
                  setCertCord({
                    ...certCord,
                    dep: { ...certCord.dep, fontColor: e.target.value },
                  })
                }
              />
            </div>
            <div className="flex mt-5 mb-2">
              <FormLabel htmlFor="email-alerts" mb="0">
                Certificate Id Position
              </FormLabel>
              <span
                onClick={() =>
                  setActiveInputElementPos({ certid: true, certname: false })
                }
              >
                {" "}
                <Switch
                  id="email-alerts"
                  isChecked={activeInputElementPos.certid}
                  colorScheme="green"
                />
              </span>
            </div>
            X: {certCord.cId.xAxis} , Y: {certCord.cId.yAxis}
            <div className="flex flex-col">
              <input
                id="font"
                className=" border-[.001rem] px-2 py-1 my-2 border-gray-500 "
                type="text"
                value={certCord.cId.fontName}
                onChange={(e) =>
                  setCertCord({
                    ...certCord,
                    cId: { ...certCord.cId, fontName: e.target.value },
                  })
                }
                placeholder="Font"
              />
              <input
                id="fontsize"
                className="rounded border-[.001rem] px-2 py-1 border-gray-500 my-2"
                type="number"
                value={certCord.cId.fontSize}
                onChange={(e) =>
                  setCertCord({
                    ...certCord,
                    cId: { ...certCord.cId, fontSize: e.target.value },
                  })
                }
                placeholder="Fontsize"
              />
              <input
                type="color"
                value={certCord.cId.fontColor}
                onChange={(e) =>
                  setCertCord({
                    ...certCord,
                    cId: { ...certCord.cId, fontColor: e.target.value },
                  })
                }
              />
            </div>
            <div className="flex flex-col mt-5 mb-2">
              <FormLabel>Event Date</FormLabel>
              <Input
                type="date"
                value={eventDetails.date}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, date: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col mt-5 mb-2 h-[300px]">
              <FormLabel>Participants List</FormLabel>
              <CsvUploader height="100%" File={files} setFile={setfiles} />
            </div>
          </FormControl>
        </div>
        <div className="w-[40%] h-[100%] ">
          <ImageUploader
            height="100%"
            File={files}
            setFile={setfiles}
            activeInput={activeInputElementPos}
            setActiveInput={setActiveInputElementPos}
            data={certCord}
            setData={setCertCord}
            eventdetails={eventDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default CertificateGen;
