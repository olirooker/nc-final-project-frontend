// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase'
// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'
// TODO: Replace the following with your app’s Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: 'AIzaSyCUZaXzwyM_lrq-og7ZxjtvQyIfoXPla6c',
    authDomain: 'safe-home-nc.firebaseapp.com',
    projectId: 'safe-home-nc',
    storageBucket: 'safe-home-nc.appspot.com',
    messagingSenderId: '439238238842',
    appId: '1:439238238842:web:667c62b3ef7272df3b11c3',
    measurementId: 'G-M4RV9K8TR2',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const google = new firebase.auth.GoogleAuthProvider()
export const facebook = new firebase.auth.FacebookAuthProvider()
export const auth = firebase.auth()
export default firebase

// OLD KEY

// const firebaseConfig = {
//     apiKey: 'AIzaSyAAZrNtQUk17CK6SWKg8FrvrlJ0d1UPKn4',
//     authDomain: 'fir-test-project-bec24.firebaseapp.com',
//     projectId: 'fir-test-project-bec24',
//     storageBucket: 'fir-test-project-bec24.appspot.com',
//     messagingSenderId: '231084931353',
//     appId: '1:231084931353:web:41362a60f57c2c5138ad88',
//     measurementId: 'G-8WWQBSMYY6',
// }
