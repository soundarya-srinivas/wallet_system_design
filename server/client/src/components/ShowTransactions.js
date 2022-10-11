import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";


const ShowTransactions = () => {
  const walletId = localStorage.getItem("walletId");
  const [transactionDetails, settransactionDetails] = useState();
  const [currentPAge, setcurrentPAge] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(5);
  const [completeDetails, setcompleteDetails] = useState();
  const [test, settest] = useState();
  const [loading, setloading] = useState(true);
  const naviagte = useNavigate();
  useEffect(() => {
    if (localStorage.hasOwnProperty("walletId")) {
      fetch(`/transactions?limit=0&skip=0&walletId=${walletId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setcompleteDetails(data);
          setloading(false);
        });
    }
  }, []);
  useEffect(() => {
    if (completeDetails?.length > 0) {
      const indexOfLastPost = currentPAge * postsPerPage;
      const indeOfFirstPost = indexOfLastPost - postsPerPage;

      const currentPosts = completeDetails.slice(
        indeOfFirstPost,
        indexOfLastPost
      );

      settransactionDetails(currentPosts);
    }
  }, [currentPAge, postsPerPage, completeDetails]);

  const paginate = (pageNumber, e) => {
    setcurrentPAge(pageNumber);
    const allActive = document.querySelectorAll(".active");
    allActive.forEach((list) => {
      list.classList.remove("active");
    });
    const parentLi = e.target.parentElement;
    parentLi.classList.add("active");
  };
  const handleSort = (e, value, uniqueKey) => {
    const upId = uniqueKey + "up";
    const downId = uniqueKey + "down";

    const id = e.target.id;

    let sortingAmount = [...completeDetails];
    if (id === upId) {
      document.getElementById(id).style.display = "none";
      document.getElementById(downId).style.display = "block";
      if (value === "createdAt") {
        sortingAmount.sort(
          (a, b) => new Date(a[value]).getTime() - new Date(b[value]).getTime()
        );
      } else {
        sortingAmount.sort((a, b) => a[value] - b[value]);
      }
    }
    if (id === downId) {
      document.getElementById(id).style.display = "none";
      document.getElementById(upId).style.display = "block";
      if (value === "createdAt") {
        sortingAmount.sort(
          (a, b) => new Date(b[value]).getTime() - new Date(a[value]).getTime()
        );
      } else {
        sortingAmount.sort((a, b) => b[value] - a[value]);
      }
    }

    setcompleteDetails(sortingAmount);
  };
  const HandleBack = () => {
    naviagte("/");
  };

  return (
    <div>
      <button onClick={HandleBack} className="backBtn">
        Back
      </button>
      <div className="wrapper">
        {loading ? (
          <div className="noTransaction">Loading..!!Please wait</div>
        ) : (
          <>
            {completeDetails?.length === 0 ? (
              <div className="noTransaction">
                No Transaction History Found ...!!
              </div>
            ) : (
              ""
            )}

            <table>
              <thead>
                <tr>
                  {transactionDetails &&
                    Object.keys(transactionDetails[0]).map((headers, index) => {
                      if (headers === "amount" || headers === "createdAt") {
                        return (
                          <th key={index}>
                            <p
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                id={index + "up"}
                                className="icon"
                                onClick={(e) => handleSort(e, headers, index)}
                                style={{
                                  display: "block",
                                  marginRight: "10px",
                                }}
                                src="./up.png"
                              ></img>
                              <img
                                id={index + "down"}
                                className="icon"
                                onClick={(e) => handleSort(e, headers, index)}
                                style={{ display: "none", marginRight: "10px" }}
                                src="./down.png"
                              ></img>
                              {headers.toLocaleUpperCase()}
                            </p>
                          </th>
                        );
                      }
                      return <th key={index}>{headers.toLocaleUpperCase()}</th>;
                    })}
                </tr>
              </thead>
              <tbody>
                {transactionDetails &&
                  transactionDetails.map((details, tableIndex) => {
                    return (
                      <tr key={tableIndex}>
                        {Object.values(details).map((values, index) => {
                          return (
                            <td key={tableIndex + "" + index}>{values}</td>
                          );
                        })}
                      </tr>
                    );
                  })}
              </tbody>
            
            </table>
            {completeDetails?.length>0? <div style={{float:"left"}}>
            <CSVLink style={{float:"right"}} className="btn" data={completeDetails}>Export to CSV</CSVLink>
            </div>:"  1"}
           
            


            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={completeDetails?.length}
              paginate={paginate}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ShowTransactions;
