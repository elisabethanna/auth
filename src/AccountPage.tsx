import React from 'react'
import { Button } from './Button'
import { MachineType } from './machine'

export const AccountPage = ({ send }: { send: MachineType['send'] }) => {
  const handleLogout = () => {
    send({ type: 'LOG_OUT' })
  }
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-white  mb-10  sm:mb-20">Welcome in</h1>
      <Button label="Log out" handleOnClick={handleLogout} />
    </div>
  )
}
