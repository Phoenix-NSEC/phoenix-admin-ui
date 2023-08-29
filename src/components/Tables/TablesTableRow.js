import {
  Button,
  Avatar,
  Badge,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import PopUp from "./PopUp";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineWhatsApp } from "react-icons/ai";
import Download from "./Download";
import VerifyButton from "./Verifybutton";

function TablesTableRow(props) {
  const {
    logo,
    name,
    email,
    subdomain,
    domain,
    status,
    date,
    index,
    paymentSs,
    uniqueId,
    allData,
    setAllData,
    setUserStatus,
    userStatus,
  } = props;

  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {name}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {email}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} marginBottom={"1.5"}>
            <Flex>
              <BsTelephone className="mr-2" />
              {domain}
            </Flex>
          </Text>
          <Text fontSize="lg" fontWeight="normal">
            <Flex>
              <AiOutlineWhatsApp className="mr-2" />
              {subdomain}
            </Flex>
          </Text>
        </Flex>
      </Td>
      <Td>
        <Badge
          bg={status ? "green.400" : bgStatus}
          color={status ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          <VerifyButton email={email}
            index={index}
            logo={logo}
            paymentSs={paymentSs}
            uniqueId={uniqueId}
            name={name}
            status={status}
            allData={allData}
            setAllData={setAllData}
            userStatus={userStatus}
            setUserStatus={setUserStatus}/>
        </Badge>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {date}
        </Text>
      </Td>
      <Td>
        {status ? (
          <Download
            email={email}
            index={index}
            logo={logo}
            paymentSs={paymentSs}
            uniqueId={uniqueId}
            name={name}
            allData={allData}
            setAllData={setAllData}
            userStatus={userStatus}
            setUserStatus={setUserStatus}
        />
        ) : (
          <PopUp
            email={email}
            index={index}
            logo={logo}
            paymentSs={paymentSs}
            uniqueId={uniqueId}
            name={name}
            allData={allData}
            setAllData={setAllData}
            userStatus={userStatus}
            setUserStatus={setUserStatus}
          />
        )}
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
