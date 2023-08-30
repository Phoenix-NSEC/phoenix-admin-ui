// Chakra imports
import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesTableRow from "components/Tables/TablesTableRow";
import React, { useState, useEffect } from "react";
import { graduationYear } from "constants/GraduationYear";

const Authors = ({
  title,
  captions,
  data,
  allData,
  setAllData,
  setUserStatus,
  userStatus,
}) => {
  const [studentData, setStudentData] = useState(data);
  const [filterStudentData, setFilterStudentData] = useState(data);
  useEffect(() => {
    setStudentData(data);
    setFilterStudentData(data);
  }, [data]);

  const handleGradYear = (e) => {
    if (e.target.value === graduationYear[0]) {
      setFilterStudentData(studentData);
    } else if (e.target.value !== "All") {
      const graduationYear = e.target.value;
      const filterData = studentData?.filter((user) => {
        return (
          graduationYear?.slice(graduationYear.length - 2) ==
          user?.graduation?.slice(user.graduation.length - 2)
        );
      });
      setFilterStudentData(filterData);
    }
  };

  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="6px 0px 22px 0px">
        <div className="flex flex-col items-start md:flex-row md:gap-3">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {title}
          </Text>
          <div className="">
            <h1 className="font-semibold">Select Year Of Graduation</h1>
            <select
              className="border-2 border-blue-500 p-1 rounded-md"
              onChange={handleGradYear}
            >
              {graduationYear?.map((gradYear) => {
                return <option key={gradYear}>{gradYear}</option>;
              })}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, idx) => {
                return (
                  <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {studentData?.length == 0 ? (
              <h1 className="text-4xl text-center">Loading.....</h1>
            ) : filterStudentData.length == 0 ? (
              <h1 className="text-4xl text-center">No Data Found!!</h1>
            ) : (
              filterStudentData?.map((row, index) => {
                return (
                  <TablesTableRow
                    key={`${row.email}-${row.name}`}
                    name={row.name}
                    logo={row.profilePic}
                    email={row.email}
                    subdomain={row.whatsapp}
                    domain={row.contact}
                    status={row.isVerified}
                    date={row.department}
                    index={index}
                    paymentSs={row.transactionPic}
                    uniqueId={row.id}
                    allData={allData}
                    setAllData={setAllData}
                    userStatus={userStatus}
                    setUserStatus={setUserStatus}
                  />
                );
              })
            )}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Authors;
