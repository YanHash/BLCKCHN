const { ethers } = require("ethers");
const Database = require("../config/database"); 
require("dotenv").config();


let provider;
let signer;


class NFT {

    constructor(chain, contractAddress, tokenID) {
        this.contractAddress = contractAddress;
        this.tokenID = tokenID;
        this.chain = chain;
        this.collection = null;

        this._name = null;
        this._NFTContract = null;
        this._NFTId = null;
        this._creator = null;
        this._holder = null;
        this._content = null;
        this._price = null;
    }

    getNFT() {
        return {
            chain: this._chain,
            contractAddress: this._contractAddress,
            tokenID: this._tokenID,

            name: this._name,
            contract : this._NFTContract,
            NFTId: this._NFTId,
            creator: this._creator,
            holder: this._holder,
            content: this._content,
            collection: this._collection,
            price: this._price,
        };
    }

    async initializeMetamask() {
        if (typeof window.ethereum !== "undefined") {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" }); 
                provider = new ethers.BrowserProvider(window.ethereum);
                signer = await provider.getSigner();
                console.log("Connexion réussie avec Metamask :", process.env.WALLET_ADD);
            } catch (error) {
                console.error("Erreur lors de la connexion à Metamask :", error);
            }
        } else {
            console.error("Metamask n'est pas installé.");
        }
    }

    async requestBlockChain() {
        try {
            if (!provider) {
                console.error("Metamask n'est pas initialisé. Appelez `initializeMetamask` d'abord.");
                return;
            }

            const abi = [
                "function name() view returns (string)",
                "function ownerOf(uint256 tokenId) view returns (address)",
                "function tokenURI(uint256 tokenId) view returns (string)",
                "function creator(uint256 tokenId) view returns (address)", 
                "function priceOf(uint256 tokenId) view returns (uint256)",
            ];

            const contract = new ethers.Contract(this._contractAddress, abi, provider);

            this._name = await contract.name();
            this._holder = await contract.ownerOf(this._tokenID);
            this._content = await contract.tokenURI(this._tokenID);
            if (contract.creator) {
                this._creator = await contract.creator(this._tokenID);
            }
            if (contract.priceOf) {
                const price = await contract.priceOf(this._tokenID);
                this._price = ethers.formatEther(price);
            }

            console.log("Données NFT récupérées :", this.getNFT());
        } catch (error) {
            console.error("Erreur lors de la récupération des données du NFT :", error);
        }
    }

    async mintNFT(mediaURI) {
        try {
            if (!signer) {
                console.error("Signer non disponible. Assurez-vous que Metamask est connecté.");
                return;
            }

            const abi = [
                "function mint(address to, string memory tokenURI) public",
            ];

            const contract = new ethers.Contract(this._contractAddress, abi, signer);

            const tx = await contract.mint(process.env.WALLET_ADD, mediaURI);
            console.log("Transaction envoyée :", tx.hash);

            const receipt = await tx.wait();
            console.log("NFT miné avec succès. Détails de la transaction :", receipt);
        } catch (error) {
            console.error("Erreur lors du minting du NFT :", error);
        }
    }
}




/* Exemple d'utilisation
(async () => {
    const nft = new NFT(
        "ethereum",
        "0xYourNFTContractAddress", // Adresse du contrat NFT
        1 // ID du NFT
    );

    await nft.initializeMetamask(); // Initialiser Metamask
    await nft.requestBlockChain(); // Récupérer les informations du NFT
    await nft.mintNFT("https://example.com/media/your-nft-metadata.json"); // Minage d'un nouveau NFT
})();
*/
