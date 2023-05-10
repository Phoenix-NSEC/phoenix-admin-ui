// Chakra imports
import { useColorModeValue, Button, Flex, Input } from "@chakra-ui/react";
import { GlobeIcon } from "components/Icons/Icons";
import { DocumentIcon } from "components/Icons/Icons";
import MiniStatistics from "../Dashboard/components/MiniStatistics";
import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Projects from "./components/Projects";
import { tablesTableData, dashboardTableData } from "variables/general";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "firebaseConfig";

function Tables() {
  const [allData, setAllData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [userStatus, setUserStatus] = useState({});

  const membersCollectionRef = collection(db, "registrations");
  const iconBoxInside = useColorModeValue("white", "white");
  /**get all members data */
  const getMembers = async () => {
    try {
      const data = await getDocs(membersCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
      }));
      setAllData(filteredData);

      let stat = {
        verified: 0,
        notVerified: 0
      }
      filteredData.map((e) => {
        if (e.isVerified)
          stat.verified += 1;
        else
          stat.notVerified += 1;
      })
      setUserStatus(stat);
      // console.log(filteredData);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**Search function */
  const search = async () => {
    if (!searchValue) {
      console.log("cannot be empty");
      return;
    }
    const q = query(membersCollectionRef, where("id", "==", searchValue));
    let userData = [];
    const fetchedData = await getDocs(q);
    fetchedData.forEach((doc) => {
      userData.push(doc.data());
    });
    console.log(userData);
    setAllData(userData);
  };

  useEffect(() => {
    if (!searchValue)
      getMembers();
  }, [searchValue]);

  useEffect(() => {
    getMembers();
  }, []);

  //console.log(allData);

  return (
    <>
      <Flex gap="20px" mx="auto" justifyContent="center" alignItems="center" wrap="wrap" flexDirection="column">
        <Flex gap="20px" mx="auto" justifyContent="center" wrap="wrap">
          <MiniStatistics
            title={"Verified Members"}
            amount={userStatus.verified}
            percentage={55}
            icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
          <MiniStatistics
            title={"Non-verified Members"}
            amount={userStatus.notVerified}
            percentage={5}
            icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
        </Flex>
      </Flex>
      <Flex gap="20px" flexDirection="row" justifyContent="center" mt="30px">
        <Input
          placeholder="Enter ref id"
          size="lg"
          placeholderTextColor="teal"
          htmlSize={50}
          width="auto"
          isInvalid
          errorBorderColor="blue"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <Button colorScheme="teal" size="md" onClick={search}>
          Search
        </Button>
      </Flex>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Authors
          title={"Members"}
          captions={["Name", "Contact no.", "Status", "Department", ""]}
          data={allData}
          allData={allData}
          setAllData={setAllData}
          userStatus={userStatus}
          setUserStatus={setUserStatus}
        />
      </Flex>
    </>
  );
}

export default Tables;
