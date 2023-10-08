import React, { useState } from "react";
import { verifyUser, unverifyUser } from "utils/firebaseFxns/verification";

const VerifyButton = ({
  email,
  index,
  logo,
  paymentSs,
  uniqueId,
  name,
  status,
  allData,
  setAllData,
  userStatus,
  setUserStatus,
}) => {
  const handleClick = async () => {
    if (!allData[index].isVerified) {
      allData[index].isVerified = true;
      console.log(uniqueId);
      var isDone = await verifyUser(email, name, uniqueId);
      if (!isDone) {
        console.log("error");
        return;
      } else {
        console.log("done");
        const newData = [...allData];
        let stat = {
          verified: (userStatus.verified += 1),
          notVerified: (userStatus.notVerified -= 1),
        };
        setUserStatus(stat);
        setAllData(newData);
      }
    } else {
      allData[index].isVerified = false;
      console.log(uniqueId);
      var isDone = await unverifyUser(uniqueId);
      if (!isDone) {
        console.log("error");
        return;
      } else {
        console.log("done");
        const newData = [...allData];
        let stat = {
          verified: (userStatus.verified += 1),
          notVerified: (userStatus.notVerified -= 1),
        };
        setUserStatus(stat);
        setAllData(newData);
      }
    }
  };

  return (
    <button onClick={handleClick}>
      {status ? "Verified" : "Not Verified"}
    </button>
  );
};

export default VerifyButton;
