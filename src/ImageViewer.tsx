import React, { useEffect, useState } from "react"

interface ImageViewerProps {
  file: File
}

const ImageViewer: React.FC<ImageViewerProps> = ({ file }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  if (!imageUrl) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center">
      <img
        src={imageUrl}
        alt={imageUrl}
        className="max-h-full min-h-full min-w-full max-w-full object-contain"
      />
    </div>
  )
}

export default ImageViewer
