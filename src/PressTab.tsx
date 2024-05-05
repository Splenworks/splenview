import React, { useEffect, useState } from "react"
import { twJoin } from "tailwind-merge"

const PressTab: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setShowMessage(false)
    }, 4000)

    return () => {
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div className="fixed top-4 left-0 right-0 flex justify-center">
      <p
        className={twJoin(
          "px-8 py-4 text-white bg-neutral-900 transition-opacity duration-500 ease-in-out",
          showMessage ? "opacity-70" : "opacity-0",
        )}
      >
        Press [tab] to see the information
      </p>
    </div>
  )
}

export default PressTab
