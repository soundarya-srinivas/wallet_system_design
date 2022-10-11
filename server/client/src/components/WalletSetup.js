import React, { useState } from "react";
import { useNavigate } from "react-router";

const WalletSetup = () => {
  const [username, setusername] = useState("");
  const [balance, setbalance] = useState(0);
  const navigate = useNavigate();
  const addWallet = () => {
    fetch("/setup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        balance: balance,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
       
        localStorage.setItem("walletId", data["_id"]);
        navigate("/");
      });
  };
  return (
    <div className="walletWrapper">
      <h2>Hi,</h2>
      <span>Please setup your wallet</span>
      <div className="flex">
        <label htmlFor="username">Username</label>
        <input
          required
          id="username"
          type="text"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        ></input>
      </div>
      <div className="flex" style={{ marginBottom: "40px" }}>
        <label htmlFor="balance">Balance(Optional)</label>
        <input
          id="balance"
          type="Number"
          value={balance}
          onChange={(e) => setbalance(e.target.value)}
        ></input>
      </div>
      <button style={{ fontSize: "large" }} onClick={addWallet} type="submit">
        Add wallet
      </button>
    </div>
  );
};

export default WalletSetup;
