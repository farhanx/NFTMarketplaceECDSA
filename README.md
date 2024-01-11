# Lazy Minting Process for ERC712 NFT Package after ECDSA Signing from the Marketplace or minter (EIP 712)

This project will demonstrate how you can use dAPP backend system to create a signed package using Ether.js and then sign an NFT Package by complying with EIP712 standard for an ERC712 NFT token. Inside the Smart contract the verification of the NFT signed package is done before processing the Lazy Minting. 

Follow the steps to run and simulate

Make dAPP Ready : 

```shell
\app\npm install --save-dev express

\app\npm nodemon --save-dev express

\app\npm install --save-dev ethers

```
Make Contracts Ready :

```shell
\npm install hardhat

\npm install @openzeppelin\contracts

\npx hardhat

\npx hardhat compile

\npx hardhat node

```

Deploy the contract

```shell
\npx hardhat run scripts\deploy.js

```

Now add copy the address and put that inside the /app/server.js file.

Also make sure that the private key inside the server.js is as per the hardhat simulation node. (Otherwise use any other private key and account as a minter)

Add the script detail inside the json file as "start: nodemon server.js".

Run the app 

```shell
\npm start

```

visit the browser on the localhost:3000 and then check console.

Copy the signed messageDigest (NFT Package) from the console, it will show token id, price, buyer and uri.

Paste this json message (NFT Package) on the verifysign.js file inside the scripts folder

now call the script as 

```shell
\npx hardhat run scripts\verifymint.js

```
