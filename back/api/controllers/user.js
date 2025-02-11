
import User from "../models/user.js"
import * as variables from '../core/variables.js'


export default class UserController {
    createUser(user){
        if(user instanceof User){
            // Ici, on récupére bien un objet
            // On va vérfier que l'id n'existe pas avant
            this.readUserByUsername(user.username)
        }
        else {
            console.log("BAD");
        }
    }
    readUser(id){}
    async readUserByUsername(username){
        console.log(await variables.firebaseState.databaseFirebase.ReadDatabase("users","1"))
    }
    updateUser(user){}
    deleteUser(id){}
    
}


