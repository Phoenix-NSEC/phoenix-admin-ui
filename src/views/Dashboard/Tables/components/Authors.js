import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesTableRow from "components/Tables/TablesTableRow";
import React, { useState } from "react";

const Authors = ({
  title,
  captions,
  data,
  allData,
  setAllData,
  setUserStatus,
  userStatus,
}) => {
  const textColor = useColorModeValue("gray.700", "white");

  // State variables to manage filtering options
  const [filterOption, setFilterOption] = useState("all");

  const handleFilter = (option) => {
    setFilterOption(option);
  };

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="6px 0px 22px 0px">
        <Text fontSize="xl" color={textColor} fontWeight="bold">
          {title}
        </Text>
        <Text p="0px 10px">
          <Button m="0px 10px" onClick={() => handleFilter("all")}>
            All
          </Button>
          <Button m="0px 10px" bg={"teal.300"} onClick={() => handleFilter("verify")}>
            Verified
          </Button>
          <Button m="0px 10px" bg={"red.300"} onClick={() => handleFilter("notverify")}>
            Not Verified
          </Button>
        </Text>
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
            {data
              .filter((row) => {
                if (filterOption === "verify") {
                  return row.isVerified === true;
                } else if (filterOption === "notverify") {
                  return row.isVerified === false;
                }
                return true; // "All" option, show all data
              })
              .map((row, index) => {
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
              })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Authors;
