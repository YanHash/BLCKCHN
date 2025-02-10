const fetch = require('node-fetch');
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

class NFT {

    constructor(
        chain, 
        contractAddress,
        tokenID
    ) {
        this._name              = name;
        this._NFTContract       = NFTContract;
        this._NFTId             = NFTId;
        this._MintingContract   = MintingContract;
        this._creator           = creator;
        this._holder            = holder;
        this._content           = content;
        this._MinitngHash       = MinitngHash;    
    }

    getNFT() {
        return JSON.stringify(this);
    }

    getPrice
}