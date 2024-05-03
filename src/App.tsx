import { useEffect, useMemo, useState } from "react"
import DragDropArea from "./DragDropArea"
import ImageViewer from "./ImageViewer"
import FileInfo from "./FileInfo"
import Footer from "./Footer"
import { FileList } from "./types/FileList"
import Header from "./Header"
import { hashCode } from "./utils/hashCode"
import { parseJsonObj } from "./utils/parseJsonObj"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import enTranslation from "./assets/translations/en.json"
import koTranslation from "./assets/translations/ko.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ko: {
        translation: koTranslation,
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })

const currentIndexes = parseJsonObj(localStorage.getItem("currentIndexes"))

function App() {
  const [fileList, setFileList] = useState<FileList>([])
  const [exited, setExited] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [infoMode, setInfoMode] = useState(false)
  const [readyToExit, setReadyToExit] = useState(false)

  const initialize = () => {
    setFileList([])
    setCurrentIndex(-1)
    setInfoMode(false)
    setReadyToExit(false)
  }

  const goNext = () => {
    if (currentIndex < fileList.length - 1) {
      setCurrentIndex((index) => index + 1)
      setInfoMode(false)
      setReadyToExit(false)
    } else if (!readyToExit) {
      alert("You have reached the end of the list.")
      setReadyToExit(true)
    } else {
      initialize()
    }
  }

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1)
      setInfoMode(false)
      setReadyToExit(false)
    } else if (!readyToExit) {
      alert("You have reached the beginning of the list.")
      setReadyToExit(true)
    } else {
      initialize()
    }
  }

  const hash = useMemo(
    () =>
      hashCode(
        fileList.map((item) => item.displayName + item.file.size).join(""),
      ),
    [fileList],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (fileList.length > 0) {
        if (
          event.key === "ArrowRight" ||
          event.key === "ArrowDown" ||
          event.key === " "
        ) {
          goNext()
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          goPrevious()
        } else if (event.key === "Tab") {
          event.preventDefault()
          setInfoMode((mode) => !mode)
        } else if (event.key === "Escape") {
          setInfoMode(false)
          setReadyToExit(false)
          setExited(true)
        }
      }
    }
    // const handleMouseWheel = (event: WheelEvent) => {
    //   const lastIndex = fileList.length - 1
    //   if (event.deltaY > 0) {
    //     setCurrentIndex(currentIndex < lastIndex ? currentIndex + 1 : lastIndex)
    //   } else if (event.deltaY < 0) {
    //     setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : 0)
    //   }
    // }
    window.addEventListener("keydown", handleKeyDown)
    // window.addEventListener("wheel", handleMouseWheel)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      // window.removeEventListener("wheel", handleMouseWheel)
    }
  }, [fileList, currentIndex, readyToExit])

  useEffect(() => {
    if (fileList.length === 0) return
    setExited(false)
    const hashedCurrentIndex = currentIndexes[hash]
    if (
      hashedCurrentIndex &&
      typeof hashedCurrentIndex === "number" &&
      hashedCurrentIndex <= fileList.length - 2
    ) {
      setCurrentIndex(hashedCurrentIndex)
    } else {
      setCurrentIndex(0)
    }
  }, [fileList])

  useEffect(() => {
    if (currentIndex === -1) return
    if (currentIndex === 0 && !currentIndexes[hash]) return
    currentIndexes[hash] = currentIndex
    localStorage.setItem("currentIndexes", JSON.stringify(currentIndexes))
  }, [currentIndex])

  if (
    !exited &&
    fileList.length > 0 &&
    currentIndex < fileList.length &&
    currentIndex >= 0
  ) {
    return (
      <>
        <ImageViewer file={fileList[currentIndex].file} />
        <div
          className="fixed top-0 bottom-0 left-0 right-1/2 opacity-0"
          onTouchStart={goPrevious}
        />
        <div
          className="fixed top-0 bottom-0 left-1/2 right-0 opacity-0"
          onTouchStart={goNext}
        />
        {infoMode && <FileInfo fileName={fileList[currentIndex].displayName} />}
      </>
    )
  }

  return (
    <>
      <Header exited={exited} goBack={() => setExited(false)} />
      <DragDropArea setFileList={setFileList} />
      <Footer />
    </>
  )
}

export default App
