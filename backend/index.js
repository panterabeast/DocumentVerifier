const { ethers } = require("ethers");

// Подключение к блокчейну Base
const provider = new ethers.providers.JsonRpcProvider("https://base.rpc.url");
const contractAddress = "0xYourContractAddress";
const abi = [
    // Вставьте ABI вашего смарт-контракта
];

const contract = new ethers.Contract(contractAddress, abi, provider);

// Функция для добавления документа
async function addDocument(docHash) {
    const signer = provider.getSigner();
    const tx = await contract.connect(signer).addDocument(docHash);
    await tx.wait();
    console.log("Document added:", docHash);
}

// Функция для верификации документа
async function verifyDocument(docHash) {
    const result = await contract.verifyDocument(docHash);
    const [exists, issuer, timestamp] = result;
    
    if (exists) {
        console.log(`Document verified! Issuer: ${issuer}, Timestamp: ${new Date(timestamp * 1000)}`);
    } else {
        console.log("Document not found");
    }
}

module.exports = { addDocument, verifyDocument };
