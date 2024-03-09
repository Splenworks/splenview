export const getImageFiles = (files: File[]): File[] => {
  return files
    .filter((file) => file.type.startsWith("image/"))
    .sort((a, b) => a.name.localeCompare(b.name))
}
