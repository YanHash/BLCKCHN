
import express from 'express';
import database from './config/database.js'
import * as variables from './core/variables.js'
import { getFirestore, collection, getDocs, doc, setDoc} from "firebase/firestore/lite";

import userRoutes from './routes/user.js';


const app = express()

variables.firebaseState.databaseFirebase = new database()
variables.firebaseState.databaseFirebase.connexionDatabase()



app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

