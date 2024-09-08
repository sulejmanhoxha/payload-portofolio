import { Code } from 'lucide-react'
export default function Footer() {
  return (
    <footer className="mb-8 mt-16 flex flex-col items-center justify-center gap-1 text-center">
      <Code className="size-10 text-primary" />
      <p className="text-sm">&copy; 2024 - Sulejman Hoxha</p>
    </footer>
  )
}
