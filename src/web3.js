import Web3 from 'web3';

// Here we are getting the web3 injected on the browser by Metamask.
const web3 = new Web3(window.web3.currentProvider);

export default web3;