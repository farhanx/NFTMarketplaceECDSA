// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";


contract PSTNFT is ERC721,Ownable,ERC721URIStorage,EIP712{

    address marketPlaceMinter;

    string private SIGNING_DOMAIN = "farhankmarketplace.com";
    string private SIGNING_VERSION = "1";
    uint256 private totalTokens;


    struct PSTNFT_PACKAGE {

        uint256 tokenId;
        uint256 price;
        string uri;
        address buyer;
        bytes signature;
    }

    constructor(string memory name, string memory symbol, address _minterMarketPlace ) ERC721(name,symbol) Ownable(msg.sender) EIP712(SIGNING_DOMAIN,SIGNING_VERSION){
        marketPlaceMinter = _minterMarketPlace;
    }


    // verify if the current package which is being sent is 100% signed by the marketplace
    function returnSignedAuthority(PSTNFT_PACKAGE calldata package) public view returns(address signer) {

        bytes32 messageDigest = _hashTypedDataV4(
            keccak256(abi.encode(keccak256("PSTNFT_PACKAGE(uint256 tokenId,uint256 price,string uri,address buyer)"),
        package.tokenId,package.price,keccak256(bytes(package.uri)),package.buyer)));

        signer = ECDSA.recover(messageDigest,package.signature);

        return signer;
    }

    function safeMinting(PSTNFT_PACKAGE calldata package) public payable {

        require(marketPlaceMinter==returnSignedAuthority(package),"Invalid Minting Request by invalid signer");
        require(msg.value >= package.price,"Not enough ether");

        _safeMint(package.buyer,package.tokenId);
        _setTokenURI(package.tokenId,package.uri);


    }

    function tokenURI(uint256 tokenId) public view override(ERC721,ERC721URIStorage) returns (string memory) {

        return super.tokenURI(tokenId);

    }

     function supportsInterface(bytes4 interfaceId) public view override(ERC721,ERC721URIStorage) returns(bool) {

        return super.supportsInterface(interfaceId);
     } 

}