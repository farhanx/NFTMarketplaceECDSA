const express = require("express");
const ethers = require("ethers");

const app = express();

const port = 3000;


//signing constant for the verification 
const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const signer = new ethers.Wallet("0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d");
const SIGNING_DOMAIN = "farhankmarketplace.com";
const SIGNING_VERSION = "1";
const chainId = 31337


const domain = {
    name: SIGNING_DOMAIN,
    version: SIGNING_VERSION,
    verifyingContract: contractAddress,
    chainId
}

async function createSignedPackage(tokenId,price,uri,buyer) {
    const package = { tokenId,price,uri,buyer};
    const types = {
        PSTNFT_PACKAGE :[
            {name:"tokenId",type:"uint256"},
            {name:"price",type:"uint256"},
            {name:"uri",type:"string"},
            {name:"buyer",type:"address"},
        ]

    };

    const signature = await signer.signTypedData(domain,types,package)

    return {...package,signature }
    
}

app.get("/",async(request,response)=>{


    const signedMsg = await createSignedPackage(200,3,"\axys\abc.jpg","0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC");

    console.log("Signed Package:")
    console.log(`[${signedMsg.tokenId},${signedMsg.price},"${signedMsg.uri}","${signedMsg.buyer}","${signedMsg.signature}"]`)
    response.send("HELLO FROM DEFI APP SIGNER");
})

app.listen(port,()=>{

    console.log(`Server is Ready: http://localhost: ${port}`);
})

