// Chakra imports
import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Projects from "./components/Projects";
import { tablesTableData, dashboardTableData } from "variables/general";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "firebaseConfig";

function Tables() {
  const [allData, setAllData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const membersCollectionRef = collection(db, "registrations");

  /**get all members data */
  const getMembers = async () => {
    try {
      const data = await getDocs(membersCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
      }));
      setAllData(filteredData);
      console.log(filteredData);
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

  useEffect(()=>{
    if(!searchValue)
      getMembers();
  },[searchValue]);

  useEffect(() => {
    getMembers();
  }, []);

  //console.log(allData);

  return (
    <>
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
        />
      </Flex>
    </>
  );
}

export default Tables;
