const firebaseConfig = {
  apiKey: 'AIzaSyCPqyPUb7DEzbixAZlXINP5f-l4k1p5Wm0',
  authDomain: 'lovet-id.firebaseapp.com',
  databaseURL: 'https://lovet-id-default-rtdb.firebaseio.com',
  projectId: 'lovet-id',
  storageBucket: 'lovet-id.appspot.com',
  messagingSenderId: '425226819053',
  appId: '1:425226819053:web:98283d79d6b831df3003e4',
  measurementId: 'G-VBDJ38KQ5Z',
}

// initialize realtime database
firebase.initializeApp(firebaseConfig)

// reference database
let memberEmailDB = firebase.database().ref('email')

document.getElementById('emailForm').addEventListener('submit', submitForm)

function submitForm(e) {
  e.preventDefault

  // get the email input
  email = document.getElementById('emailInput').value

  // add the email input to the db
  let newMemberEmail = memberEmailDB.push()

  newMemberEmail.set({
    email: email,
  })
}
