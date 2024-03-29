import React from "react"

const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 bg-white">
      <div className="flex items-center justify-center h-16 px-16 text-lg font-semibold">
        <p className="text-black">SplenView</p>
      </div>
    </header>
  )
}

export default Header
