// Firebase SDK
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { getStorage } from "firebase/storage"

// Firebase Hooks

const appFirebase = firebase.initializeApp({
  apiKey: "AIzaSyBOz3j8jm6hHELqegXzLxycVcxlqNwE2Fs",
  authDomain: "lovet-chat.firebaseapp.com",
  projectId: "lovet-chat",
  storageBucket: "lovet-chat.appspot.com",
  messagingSenderId: "765869922982",
  appId: "1:765869922982:web:e9f276ab5b4015621af267",
  measurementId: "G-QPGWXV6LTX",
})

const firestore = firebase.firestore()
const auth = firebase.auth()
const storage = getStorage(appFirebase)

export default { firestore, auth, appFirebase, storage, firebase }
