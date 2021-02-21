import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCLlH9bz09rPeQEr_jiWXJ6JXF68aI7wDU",
    authDomain: "mern-whatsapp-clone-fe9e6.firebaseapp.com",
    databaseURL: "https://mern-whatsapp-clone-fe9e6.firebaseio.com",
    projectId: "mern-whatsapp-clone-fe9e6",
    storageBucket: "mern-whatsapp-clone-fe9e6.appspot.com",
    messagingSenderId: "196230610132",
    appId: "1:196230610132:web:d149604ee9e5bcbf29cf41",
    measurementId: "G-2MKE6KRFTX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider };
