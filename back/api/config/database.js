import path from 'path';
import * as variables from "../core/variables.js"

import dotenv from "dotenv"

dotenv.config()

import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDoc, doc, setDoc} from "firebase/firestore/lite";

export default class Database {

    constructor(){}

    // Your web app's Firebase configuration
    firebaseConfig  = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID
    };
  
    connexionDatabase(){
        // Initialize Firebase
        variables.firebaseState.firebaseConfig = this.firebaseConfig
        variables.firebaseState.appFirebase = initializeApp(this.firebaseConfig);
        variables.firebaseState.db  = getFirestore(variables.firebaseState.appFirebase);
        console.log("demarrage service firebase OK");
    }

    insertBDD(collectionName, documentName, value){
        setDoc(doc(variables.firebaseState.db, collectionName, documentName),value);
    }

    async ReadDatabase(collectionName, documentName){
        try {
            const docRef = doc(variables.firebaseState.db, collectionName, documentName);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                return null
            }
        }
        catch(e){
            // en cas d'erreur, on retourne null
            return null
        }
        
    }

}



