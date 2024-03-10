import { unzip } from "unzipit"

const looksLikeImage = (fileName: string) => {
  return (
    fileName.endsWith(".jpg") ||
    fileName.endsWith(".jpeg") ||
    fileName.endsWith(".png") ||
    fileName.endsWith(".gif") ||
    fileName.endsWith(".webp")
  )
}

export const getImageFiles = async (files: File[]): Promise<File[]> => {
  const sortedFiles = files
    .filter(
      (file) => file.type.startsWith("image/") || file.name.endsWith(".zip"),
    )
    .sort((a, b) => a.name.localeCompare(b.name))

  const unzippedFiles: Array<File> = []

  for await (const file of sortedFiles) {
    if (file.name.endsWith(".zip")) {
      const { entries } = await unzip(file)
      const names = Object.keys(entries).filter(looksLikeImage)
      const blobs = await Promise.all(
        names.map((name) => entries[name].blob("image/*")),
      )
      const newFiles = blobs.map(
        (blob, index) => new File([blob], names[index], { type: blob.type }),
      )
      unzippedFiles.push(...newFiles)
    } else {
      unzippedFiles.push(file)
    }
  }

  return unzippedFiles
}
