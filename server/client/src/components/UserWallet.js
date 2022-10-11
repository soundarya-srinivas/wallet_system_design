import React, { useEffect, useState } from "react";

import Transaction from "./Transaction";

const UserWallet = () => {
  const walletId = localStorage.getItem("walletId");
  const [userDetails, setuserDetails] = useState("");
  const [isTransaction, setisTransaction] = useState(false);

  useEffect(() => {
    
    if (localStorage.hasOwnProperty("walletId")) {
      fetch(`/wallet/${walletId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          
          setuserDetails(data);
        });
    }
  }, [isTransaction]);

  return (
    <>
      <div
        className="card"
        style={{ backgroundImage: `url("background4.jpg")` }}
      >
        <h2 className="pl"> Hi {userDetails && userDetails.name}</h2>
        <p className="pl">Your balance is {userDetails.balance}</p>
      </div>
      <Transaction handleSubmit={() => setisTransaction(!isTransaction)} />
    </>
  );
};

export default UserWallet;
