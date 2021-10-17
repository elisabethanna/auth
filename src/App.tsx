import React, { useEffect } from 'react'
import firebase from 'firebase/compat/app'
import { getAuth } from 'firebase/auth'
import { AccountPage } from './AccountPage'
import { LoadingIcon } from './assets/LoadingIcon'
import { machine } from './machine'
import { useMachine } from '@xstate/react'
import { LogInView } from './LogInView'
import { SignUpView } from './SignUpView'

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
  const [state, send] = useMachine(machine(auth))

  useEffect(() => {
    auth!.onAuthStateChanged((user) => {
      if (user) {
        send({ type: 'GO_TO_IDLE' })
      } else {
        send({ type: 'GO_TO_LOG_IN_VIEW' })
      }
    })
  }, [auth, send])

  const loading =
    state.matches('loadingAuth') ||
    state.matches('loggingIn') ||
    state.matches('signingUp') ||
    state.matches('loggingOut')
  const logInView = state.matches('logInView')
  const idle = state.matches('idle')
  const signUpView = state.matches('signUpView')
  const errorView = state.matches('errorView')

  return (
    <div className="bg-green opacity-50 min-h-screen flex items-center justify-center ">
      {loading && <LoadingIcon />}
      {logInView && <LogInView send={send} />}
      {signUpView && <SignUpView send={send} />}
      {idle && <AccountPage send={send} />}
      {errorView && <h1 className="text-white"> Oops something happened...</h1>}
    </div>
  )
}

export default App
