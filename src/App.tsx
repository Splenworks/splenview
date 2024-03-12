import { useEffect, useState } from "react"
import DragDropArea from "./DragDropArea"
import ImageViewer from "./ImageViewer"
import FileInfo from "./FileInfo"
import Footer from "./Footer"

function App() {
  const [files, setFiles] = useState<File[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFileInfo, setShowFileInfo] = useState(false)

  useEffect(() => {
    const initialize = () => {
      setFiles([])
      setCurrentIndex(0)
      setShowFileInfo(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (files.length > 0) {
        if (
          event.key === "ArrowRight" ||
          event.key === "ArrowDown" ||
          event.key === " "
        ) {
          if (currentIndex < files.length - 1) {
            setCurrentIndex((index) => index + 1)
            setShowFileInfo(false)
          } else {
            alert("You have reached the end of the list.")
            initialize()
          }
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          if (currentIndex > 0) {
            setCurrentIndex((index) => index - 1)
            setShowFileInfo(false)
          } else {
            initialize()
          }
        } else if (event.key === "Tab") {
          event.preventDefault()
          setShowFileInfo((show) => !show)
        } else if (event.key === "Escape") {
          initialize()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [files, setFiles, currentIndex, setCurrentIndex, setShowFileInfo])

  if (files.length > 0 && currentIndex < files.length) {
    return (
      <>
        <ImageViewer file={files[currentIndex]} />
        {showFileInfo && <FileInfo fileName={files[currentIndex].name} />}
      </>
    )
  }

  return (
    <>
      <DragDropArea setFiles={setFiles} />
      <Footer />
    </>
  )
}

export default App
