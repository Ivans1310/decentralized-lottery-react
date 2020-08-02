import Web3 from "web3";

// Here we are getting the web3 injected on the browser by Metamask.

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5,
};
const web3 = new Web3(window.ethereum, null, OPTIONS);

window.ethereum.enable();

export default web3;
