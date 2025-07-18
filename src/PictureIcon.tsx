import { FC } from "react"
import { useDarkmode } from "./hooks/useDarkmode"

const pink500 = "#ec4899"
const pink700 = "#be185d"
const pink900 = "#831843"

const PictureIcon: FC<{ className?: string }> = ({ className }) => {
  const { darkMode } = useDarkmode()
  return (
    <svg width="800" height="800" viewBox="-.5 .5 42 42" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={pink700} />
          <stop offset="100%" stopColor={darkMode ? pink500 : pink900} />
        </linearGradient>
      </defs>
      <path
        fill="url(#gradient)"
        d="M35.79 31.5c-.05-.04-5.181-7.971-6.72-7.971-1.51 0-4.391 3.851-4.391 3.851-2.24-2.31-7.2-8.87-8.661-8.87-1.509 0-7.449 8.12-10.789 12.99H35.79zm-8.979-17c0 2.04 1.649 3.69 3.689 3.69s3.689-1.65 3.689-3.69-1.649-3.69-3.689-3.69-3.689 1.65-3.689 3.69zM.5 7.5v27c0 2.52.51 3 3 3h34c2.471 0 3-.46 3-3v-27c0-2.46-.471-3-3-3h-34c-2.48 0-3 .43-3 3zm3 0h34v27h-34v-27z" />
    </svg>
  )
}

export default PictureIcon
