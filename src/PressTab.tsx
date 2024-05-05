import React, { useEffect, useState } from "react"

const PressTab: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setShowMessage(false)
    }, 5000)

    return () => {
      clearTimeout(hideTimer)
    }
  }, [])

  return <div>{showMessage && <p>Press [tab] to see the information</p>}</div>
}

export default PressTab
