
const express = require('express')
const database = require('./config/database')
const variables = require('./core/variables')
const { getFirestore, collection, getDocs, doc, setDoc} = require("firebase/firestore/lite");

const app = express()

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

