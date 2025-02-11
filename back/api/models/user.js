export default class User {

    constructor(username, wallet_address){
        this._id = -1
        this._username = username
        this._wallet_address = wallet_address
    }


    toJSON(){

    }

    fromJSON(){
        
    }

    
    getObject(){
        return {
            username:this._username,
            wallet_address:this._wallet_address
        }
    }

    get wallet_address(){
        return this._wallet_address;
    }
    set wallet_address(wallet_address){
        this._wallet_address = wallet_address;
    }

    get username(){
        return this._username;
    }
    set username(username){
        this._username = username;
    }


    get id(){
        return this._id;
    }
    set id(id){
        this._id = id;
    }


}