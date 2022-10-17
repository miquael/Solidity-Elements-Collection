require('dotenv').config();
const ethers = require('ethers');
// Get Alchemy API Key
const API_KEY = process.env.API_KEY;
// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('goerli', API_KEY)
// Get contract ABI file
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// print ABI (optional)
// console.log(JSON.stringify(contract.abi));

// ///////////////////////////////////////////////////////////////////////

// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0x98945cE4c7F92B7E32461744f450Bc76687d79b2'

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmaZkp6dDfDT1C2x7oqQuKgBkyzzurxhAiCpTs4jJ4ZwkF"

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });