import { type File } from '@/payload-types'

interface FileBlockProps {
  file: File
}

export const FileBlock = ({ file }: FileBlockProps) => {
  const fileData = file as File
  const linkText = fileData.title || fileData.filename
  const url = fileData.url!
  return (
    <a href={url} download>
      {linkText}
    </a>
  )
}
