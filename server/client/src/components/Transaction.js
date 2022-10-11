import React, { useState } from "react";
import Switch from "./Switch";
import { useNavigate } from "react-router-dom";
import ValidationComp from "./ValidationComp";

const Transaction = ({ handleSubmit }) => {
  const walletId = localStorage.getItem("walletId");
  let [Amount, setAmount] = useState();
  const [credit, setcredit] = useState(false);
  const [debit, setdebit] = useState(false);
  const [description, setdescription] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const navigate = useNavigate();

  const HandleTransaction = () => {
    let type;
    if (Amount) {
      if (credit || debit) {
        if (description !== "") {
          if (credit) {
            type = "CREDIT";
            Amount = Amount * 1;
          } else if (debit) {
            type = "DEBIT";
            Amount = Amount * -1;
          }

          fetch(`/transact/${walletId}`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: Amount,
              type: type,
              description: description,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data === "Cancelled") {
                alert("Insufficient Balance");
              }
              handleSubmit();
              setAmount("");
              setcredit(false);
              setdebit(false);
              setdescription("");
              seterrorMessage("");
            });
        } else {
          seterrorMessage("Please Provide Description !!");
        }
      } else {
        seterrorMessage("Please Provide Credit or Debit details !!");
      }
    } else {
      seterrorMessage("Please Add Amount !!");
    }
  };

  return (
    <div className="rightContent">
      <h2 className="center">Transaction</h2>
      <div className="flex">
        <label htmlFor="Amount">Amount</label>
        <input
          required
          id="Amount"
          type="Number"
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
      </div>
      <div className="flex">
        <label>Credit</label>
        <Switch
          unique="credit"
          isOn={credit}
          handleToggle={() => {
            setcredit(!credit);
            setdebit(false);
          }}
        />
      </div>
      <div className="flex">
        <label>Debit</label>
        <Switch
          unique="debit"
          isOn={debit}
          handleToggle={() => {
            setdebit(!debit);
            setcredit(false);
          }}
        />
      </div>
      <div className="flex">
        <label htmlFor="description">Description</label>
        <input
          required
          id="description"
          type="text"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        ></input>
      </div>
      {errorMessage ? <ValidationComp msg={errorMessage} /> : ""}

      <button className="completeBtn" onClick={HandleTransaction} type="submit">
        Complete Transaction
      </button>
      <br />
      <div style={{ color: "black" }}></div>
      <button onClick={() => navigate("ShowTransaction")}>
        Show Transactions
      </button>
    </div>
  );
};

export default Transaction;
