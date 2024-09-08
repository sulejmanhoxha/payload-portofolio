import me from '@/assets/me.jpg'
import Image from 'next/image'

import { Instagram, Github, Linkedin, Phone, Mail } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { ArrowDownToLine } from 'lucide-react'

export default function Header() {
  return (
    <>
      <section>
        <div className="mb-2 mt-8 size-20 rounded-full bg-primary">
          <Image
            src={me}
            alt="A photo of me"
            height={300}
            width={300}
            className="aspect-square rounded-full border-2 object-cover shadow-md dark:border-foreground"
          />
        </div>
        <h1 className="text-xl font-semibold">Sulejman Hoxha</h1>
        <h2 className="mb-3 mt-1 text-lg text-muted/75">Full-stack developer</h2>
        <h2 className="flex items-center gap-2 text-muted/75">
          <Mail className="size-5" />
          sulejman.hoxha.dev@gmail.com
        </h2>
        <h2 className="mb-6 mt-0.5 flex items-center gap-2 text-muted/75">
          <Phone className="size-5" /> +382 69 828 364
        </h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a target="_blank" rel="noreferrer" href="#">
              <Instagram className="size-6" />
            </a>
            <a target="_blank" rel="noreferrer" href="#">
              <Github className="size-6" />
            </a>
            <a target="_blank" rel="noreferrer" href="#">
              <Linkedin className="size-6" />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/cv.pdf"
              target="_blank"
              className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-primary px-3 py-1 font-normal text-background transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              <ArrowDownToLine className="mr-1.5 size-4" />
              CV
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
            </a>

            <ThemeToggle />
          </div>
        </div>
      </section>

      <Divider />
    </>
  )
}

const Divider = () => <div className="my-8 w-full rounded-full border border-muted/15"></div>
