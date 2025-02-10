const path = require('path');
const variables = require("../core/variables")
require('dotenv').config()



const { initializeApp } = require("firebase/app");

const { getFirestore, collection, getDocs, doc, setDoc} = require("firebase/firestore/lite");

class Database {

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
        variables.firebaseConfig = this.firebaseConfig
        variables.appFirebase = initializeApp(this.firebaseConfig);
        variables.db  = getFirestore(variables.appFirebase);
        console.log("demarrage service firebase OK");
    }

    insertBDD(collectionName, documentName, value){
        setDoc(doc(variables.db, collectionName, documentName),value);
    }

}




module.exports = Database;