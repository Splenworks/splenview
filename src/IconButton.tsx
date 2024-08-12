import React from "react"
import { twMerge } from "tailwind-merge"

interface IconButtonProps {
  svgIcon: React.FunctionComponent
  id?: string
  className?: string
  onClick?: () => void
}

const IconButton: React.FC<IconButtonProps> = ({
  svgIcon,
  id,
  className,
  onClick,
}) => {
  return (
    <button
      id={id}
      className={twMerge(
        "flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ease-in-out hover:bg-zinc-500 hover:bg-opacity-50",
        className,
      )}
      onClick={onClick}
    >
      {svgIcon({ className: "w-6 h-6 text-white" })}
    </button>
  )
}

export default IconButton
