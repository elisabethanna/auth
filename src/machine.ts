import { Auth, createUserWithEmailAndPassword, signOut } from '@firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { assign, createMachine, Interpreter, State, StateSchema } from 'xstate'
type Context = {
  logInEmail: string
  logInPassword: string
  signUpEmail: string
  signUpPassword: string
  auth?: Auth
}
type AuthEvents =
  | GoToIdleEvent
  | GoToLogInView
  | TypeEmailEvent
  | TypePasswordEvent
  | LogInEvent
  | ErrorEvent
  | LogOutEvent
  | GoToSignUpViewEvent
  | SignUpEvent

type GoToIdleEvent = { type: 'GO_TO_IDLE' }
type GoToLogInView = { type: 'GO_TO_LOG_IN_VIEW' }
type TypeEmailEvent = { type: 'TYPE_EMAIL'; email: string }
type TypePasswordEvent = { type: 'TYPE_PASSWORD'; password: string }
type LogInEvent = { type: 'LOG_IN' }
type ErrorEvent = { type: 'GO_TO_ERROR_VIEW'; error: string }
type LogOutEvent = { type: 'LOG_OUT' }
type GoToSignUpViewEvent = { type: 'GO_TO_SIGN_UP_VIEW' }
type SignUpEvent = { type: 'SIGN_UP' }

export interface MachineType {
  state: State<Context, AuthEvents>
  send: Interpreter<Context, StateSchema<Context>, AuthEvents>['send']
}

export const machine = (auth: Auth) =>
  createMachine<Context, AuthEvents>(
    {
      initial: 'loadingAuth',
      context: {
        logInEmail: '',
        logInPassword: '',
        signUpEmail: '',
        signUpPassword: '',
      },
      states: {
        loadingAuth: {
          on: {
            GO_TO_IDLE: { target: 'idle' },
            GO_TO_LOG_IN_VIEW: { target: 'logInView' },
          },
        },
        logInView: {
          on: {
            TYPE_EMAIL: { actions: 'typeEmailForLoggingIn' },
            TYPE_PASSWORD: { actions: 'typePasswordForLoggingIn' },
            LOG_IN: { target: 'loggingIn' },
            GO_TO_SIGN_UP_VIEW: { target: 'signUpView' },
          },
        },
        loggingIn: {
          invoke: { src: 'loggingIn', onDone: 'idle', onError: 'errorView' },
        },
        idle: { on: { LOG_OUT: { target: 'loggingOut' } } },
        loggingOut: {
          invoke: {
            src: 'loggingOut',
            onDone: { target: 'logInView' },
            onError: { target: 'errorView' },
          },
        },
        signUpView: {
          on: {
            TYPE_EMAIL: { actions: 'typeEmailForSignUp' },
            TYPE_PASSWORD: { actions: 'typePasswordForSignUp' },
            SIGN_UP: { target: 'signingUp' },
          },
        },
        signingUp: {
          invoke: {
            src: 'signingUp',
            onDone: { target: 'idle' },
            onError: { target: 'errorView' },
          },
        },
        errorView: {},
      },
    },
    {
      actions: {
        typeEmailForLoggingIn: assign({
          logInEmail: (_, e) => (e as TypeEmailEvent).email,
        }),
        typePasswordForLoggingIn: assign({
          logInPassword: (_, e) => (e as TypePasswordEvent).password,
        }),
        typeEmailForSignUp: assign({
          signUpEmail: (_, e) => (e as TypeEmailEvent).email,
        }),
        typePasswordForSignUp: assign({
          signUpPassword: (_, e) => (e as TypePasswordEvent).password,
        }),
      },
      services: {
        loggingOut: () =>
          signOut(auth)
            .then(() => console.log('signing out'))
            .catch((error) => console.log(error.message)),

        loggingIn: (ctx) =>
          signInWithEmailAndPassword(auth, ctx.logInEmail, ctx.logInPassword)
            .then((userCredential) => {
              console.log('logging in')
            })
            .catch((error) => {
              console.log(error.message)
            }),

        signingUp: (ctx) =>
          createUserWithEmailAndPassword(
            auth,
            ctx.signUpEmail,
            ctx.signUpPassword
          )
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user
              console.log(user)
              // ...
            })
            .catch((error) => {
              console.log(error.message)
            }),
      },
    }
  )
