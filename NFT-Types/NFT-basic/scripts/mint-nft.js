require('dotenv').config();
const ethers = require('ethers');
// for generating ABI
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// Get Alchemy API Key
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('goerli', API_KEY)

// print ABI (optional)
// console.log(JSON.stringify(contract.abi));