import React from 'react'
import { Button } from './Button'
import { MachineType } from './machine'

export const LogInView = ({ send }: { send: MachineType['send'] }) => {
  const handleClickOnSignUpText = () => send({ type: 'GO_TO_SIGN_UP_VIEW' })

  const handleMailInput = (e: React.FormEvent<HTMLInputElement>) =>
    send({ type: 'TYPE_EMAIL', email: e.currentTarget.value })

  const handlePasswordInput = (e: React.FormEvent<HTMLInputElement>) =>
    send({ type: 'TYPE_PASSWORD', password: e.currentTarget.value })

  const handleLogin = () => send({ type: 'LOG_IN' })
  return (
    <div>
      <h1 className="text-white text-center mb-10 sm:mb-20">
        Firebase Auth Application
      </h1>
      <div className="h-1/2 w-3/4 flex flex-col border-2 border-white rounded-3xl px-8 py-10 sm:py-20 m-auto">
        <p className="text-white text-lg">Login</p>
        <input
          className="h-8 rounded-3xl p-4 my-2"
          placeholder="mail"
          onChange={handleMailInput}
          type="email"
        />
        <input
          className="h-8 rounded-3xl p-4 my-2"
          placeholder="password"
          onChange={handlePasswordInput}
          type="password"
        />
        <div className="flex w-full justify-end">
          <Button label="Log in" handleOnClick={handleLogin} />
        </div>
        <p
          className="text-sm pt-8 flex justify-center text-white font-bold cursor-pointer"
          onClick={handleClickOnSignUpText}
        >
          Sign up for Firebase Auth Application
        </p>
      </div>
    </div>
  )
}
