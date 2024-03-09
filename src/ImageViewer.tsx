import React from "react"

interface ImageViewerProps {
  file: File
}

const ImageViewer: React.FC<ImageViewerProps> = ({ file }) => {
  const imageUrl = URL.createObjectURL(file)

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <img src={imageUrl} alt={imageUrl} className="max-w-full max-h-full" />
    </div>
  )
}

export default ImageViewer
