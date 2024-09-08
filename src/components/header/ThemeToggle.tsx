'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className="rounded-full bg-accent p-2 text-background transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun
        size={24}
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <Moon size={24} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    </button>
  )
}
