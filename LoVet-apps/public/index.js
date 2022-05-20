import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCPqyPUb7DEzbixAZlXINP5f-l4k1p5Wm0",
    authDomain: "lovet-id.firebaseapp.com",
    projectId: "lovet-id",
    storageBucket: "lovet-id.appspot.com",
    messagingSenderId: "425226819053",
    appId: "1:425226819053:web:98283d79d6b831df3003e4",
    measurementId: "G-VBDJ38KQ5Z"
});

const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp);

// Detect auth state
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('logged in!');
    } else {
        console.log('no user');
    }
});
