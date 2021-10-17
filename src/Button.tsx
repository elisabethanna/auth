import React from 'react'

export const Button = ({
  handleOnClick,
  label,
}: {
  handleOnClick: () => void
  label: string
}) => {
  return (
    <button
      className="bg-white font-bold w-max px-4 rounded-3xl border-2 text-green"
      onClick={handleOnClick}
    >
      {label}
    </button>
  )
}
