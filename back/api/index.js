
const express = require('express')
const database = require('./config/database')
const variables = require('./core/variables')
const { getFirestore, collection, getDocs, doc, setDoc} = require("firebase/firestore/lite");

const app = express()

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDJfDYmu3P2DYlG24_v1soCY4bwYJfuPU8",
//     authDomain: "infinitymint.firebaseapp.com",
//     projectId: "infinitymint",
//     storageBucket: "infinitymint.firebasestorage.app",
//     messagingSenderId: "17080244891",
//     appId: "1:17080244891:web:b490790003d0a0379e843e"
// };
  
// // Initialize Firebase
// const appFirebase = initializeApp(firebaseConfig);
// const db = getFirestore(appFirebase);

variables.databaseFirebase = new database()
variables.databaseFirebase.connexionDatabase()
  
app.get('/', (req, res) => {
    res.send("Hello from Express!")
    test = {
        name: "Frankin",
        age: 10,
        country: "USA"
    }
    variables.databaseFirebase.insertBDD("users","1",test)

})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

