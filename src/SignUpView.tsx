import React from 'react'
import { Button } from './Button'
import { MachineType } from './machine'

export const SignUpView = ({ send }: { send: MachineType['send'] }) => {
  const handleMailInput = (e: React.FormEvent<HTMLInputElement>) =>
    send({ type: 'TYPE_EMAIL', email: e.currentTarget.value })

  const handlePasswordInput = (e: React.FormEvent<HTMLInputElement>) =>
    send({ type: 'TYPE_PASSWORD', password: e.currentTarget.value })

  const handleSignUp = () => send({ type: 'SIGN_UP' })

  return (
    <div>
      <h1 className="text-white text-center mb-10 sm:mb-20">
        Firebase Auth Application
      </h1>
      <div className="h-1/2 w-3/4 flex flex-col border-2 border-white rounded-3xl px-8 py-10 sm:py-20 m-auto">
        <p className="text-white text-lg">Sign up</p>
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
          <Button label="Sign up" handleOnClick={handleSignUp} />
        </div>
        <p className="invisible pt-8 text-sm">placeholder</p>
      </div>
    </div>
  )
}
