import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyC7mUGQzUxU_mfqog_9tUzyEOEYbio5GVg',
    authDomain: 'auth-7702a.firebaseapp.com',
    projectId: 'auth-7702a',
    storageBucket: 'auth-7702a.appspot.com',
    messagingSenderId: '460641117576',
    appId: '1:460641117576:web:7b58b2893063b8fdf3863d',
    measurementId: 'G-JRQKCPEX4R',
  }
  firebase.initializeApp(firebaseConfig)
  const auth = getAuth()

  const [mail, setMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  // createUserWithEmailAndPassword(auth, 'aaa@aaa.se', 'psw123')
  //   .then(userCredential => {
  //     // Signed in
  //     const user = userCredential.user;
  //     console.log(user);
  //     // ...
  //   })
  //   .catch(error => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });

  const handleMailInput = (e: React.FormEvent<HTMLInputElement>) =>
    setMail(e.currentTarget.value)

  const handlePasswordInput = (e: React.FormEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value)

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  useEffect(() => {
    console.log(auth.currentUser)

    auth!.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })
  }, [])

  return (
    <div className="bg-yellow-900	opacity-50 min-h-screen flex items-center justify-center ">
      {loggedIn ? (
        <h1>logged in</h1>
      ) : (
        <div>
          <h1 className="text-white text-center mb-10 sm:mb-20">
            Welcome to Anna's wonderland
          </h1>
          <div className="h-1/2 w-3/4 flex flex-col border-2 rounded-3xl px-8 py-10 sm:py-20 m-auto">
            <p className="text-white text-lg">Login</p>
            <input
              className="h-8 rounded-3xl p-4 my-2"
              placeholder="mail"
              onChange={handleMailInput}
            />
            <input
              className="h-8 rounded-3xl p-4 my-2"
              placeholder="password"
              onChange={handlePasswordInput}
            />
            <div className="flex w-full justify-end">
              <button
                className="bg-white font-bold w-max px-4 rounded-3xl border-2 text-yellow-900"
                onClick={handleLogin}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
