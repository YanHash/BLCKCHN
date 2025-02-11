const { ethers } = require("ethers");
require("dotenv").config();


class NFT {
    constructor(chain, contractAddress, tokenID) {
        this._contractAddress = contractAddress;
        this._tokenID = tokenID;
        this._chain = chain;
        this._walletAddress = process.env.WALLET_ADD;

        this._name = null;
        this._NFTContract = null;
        this._NFTId = null;
        this._creator = null;
        this._holder = null;
        this._content = null;
        this._collection = null;
        this._price = null;

        this._provider = null;
        this._signer = null;
    }

    getNFT() {
        return JSON.stringify(this, null, 2);
    }

    async initializeMetamask() {
        if (typeof window.ethereum !== "undefined") {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" }); 
                this._provider = new ethers.BrowserProvider(window.ethereum);
                this._signer = await this._provider.getSigner();
                this._walletAddress = await this._signer.getAddress();
                console.log("Connexion réussie avec Metamask :", this._walletAddress);
            } catch (error) {
                console.error("Erreur lors de la connexion à Metamask :", error);
            }
        } else {
            console.error("Metamask n'est pas installé.");
        }
    }

    async requestBlockChain() {
        try {
            if (!this._provider) {
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

            const contract = new ethers.Contract(this._contractAddress, abi, this._provider);

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
            if (!this._signer) {
                console.error("Signer non disponible. Assurez-vous que Metamask est connecté.");
                return;
            }

            const abi = [
                "function mint(address to, string memory tokenURI) public",
            ];

            const contract = new ethers.Contract(this._contractAddress, abi, this._signer);

            const tx = await contract.mint(this._walletAddress, mediaURI);
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
