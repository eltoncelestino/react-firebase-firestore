import firebase from 'firebase/app'
import 'firebase/firestore' 
import firebase_key from '../keys/firebase_keys'

export default class Firebase {
    // inicializa a conexão com o firebase
    constructor(){
        firebase.initializeApp(firebase_key)
    }

    getFirestore(){
        return firebase.firestore()
    }

    // getAuth(){
    //     return firebase.auth()
    // }
}