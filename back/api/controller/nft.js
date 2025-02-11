import NFT from "../models/nft.js";
import * as variables from '../core/variables.js';

export default class NFTController {
    async addNFT(nft) {
        if (nft instanceof NFT) {
            const exists = await this.checkNFT(nft._contractAddress, nft._tokenID, nft._chain, nft._collection);
            if (!exists) {
                await variables.firebaseState.databaseFirebase.insertBDD("nfts", nft._tokenID.toString(), nft);
                console.log("NFT ajouté avec succès !");
            } else {
                console.log("NFT déjà existant dans la base de données.");
            }
        } else {
            console.log("L'objet fourni n'est pas une instance de NFT.");
        }
    }

    async checkNFT(contract, id, chain, collection) {
        try {
            const nftData = await variables.firebaseState.databaseFirebase.readBDD("nfts", collection);
            if (nftData) {
                const nftExists = nftData.some(
                    (nft) =>
                        nft.contractAddress === contract &&
                        nft.tokenID === id &&
                        nft.chain === chain
                );
                return nftExists;
            }
            return false; 
        } catch (error) {
            console.error("Erreur lors de la vérification du NFT :", error);
            return false;
        }
    }

    async readNFT(contract, id, chain, collection) {
        try {
            const nftData = await variables.firebaseState.databaseFirebase.readBDD("nfts", collection);
            const nft = nftData.find(
                (nft) =>
                    nft.contractAddress === contract &&
                    nft.tokenID === id &&
                    nft.chain === chain
            );
            if (nft) {
                console.log("NFT trouvé :", nft);
                return nft;
            } else {
                console.log("NFT non trouvé.");
                return null;
            }
        } catch (error) {
            console.error("Erreur lors de la lecture des données NFT :", error);
            return null;
        }
    }
}
