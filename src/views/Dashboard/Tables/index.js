// Chakra imports
import { Flex } from "@chakra-ui/react";
import React from "react";
import Authors from "./components/Authors";
import Projects from "./components/Projects";
import { tablesTableData, dashboardTableData } from "variables/general";

function Tables() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Authors
        title={"Members"}
        captions={["Name", "Contact no.", "Reference ID", "Status", ""]}
        data={tablesTableData}
      />
    </Flex>
  );
}

export default Tables;
