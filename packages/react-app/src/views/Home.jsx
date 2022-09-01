import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Menu, Row, Divider, Input } from "antd";
import { Address, Balance, Events } from "../components";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts, mainnetProvider, writeContracts, tx }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const [currentNumber, setCurrentNumber] = useState("0")
  const [newNumber, setNewNumber] = useState("0")

  return (
    <div>
      <h2>You Contract deployed at:</h2>
      <Address
        address={readContracts && readContracts.SimpleStorage ? readContracts.SimpleStorage.address : null}
        ensProvider={mainnetProvider}
        fontSize={16}
      />
        <Divider />
      <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        <div style={{padding: "10px"}}>
          {currentNumber}
        </div>
        <Button onClick={async () => {
          const number = await readContracts.SimpleStorage.getNumber()
          console.log(number.toString())
          // setNewNumber(number.toString())
          setCurrentNumber(number.toString())
        }}>
          Get Number
        </Button>
      </div>
      <Divider />
      <div>
          <Input
            onChange={e => {
              setNewNumber(e.target.value)
            }}
            style={{ width: "200px" }}
          />
        <Button
          style={{ marginTop: 8 }}
          onClick={async () => {
            const result = tx(writeContracts.SimpleStorage.setNumber(newNumber), update => {
              console.log("📡 Transaction Update:", update);
              if (update && (update.status === "confirmed" || update.status === 1)) {
                console.log(" 🍾 Transaction " + update.hash + " finished!");
                console.log(
                  " ⛽️ " +
                    update.gasUsed +
                    "/" +
                    (update.gasLimit || update.gas) +
                    " @ " +
                    parseFloat(update.gasPrice) / 1000000000 +
                    " gwei",
                );
              }
            });
            console.log("awaiting metamask/web3 confirm result...", result);
            console.log(await result);
          }}
        >
          Set Number
        </Button>
      </div>
    </div>

  );
}

export default Home;
