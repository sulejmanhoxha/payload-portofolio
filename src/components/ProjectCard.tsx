import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function ProjectCard({
  image,
  title,
  description,
  technologies,
  id,
}: {
  image: string
  title: string
  description: string
  technologies: string[]
  id: string
}) {
  const router = useRouter()
  return (
    <div
      className="flex flex-col gap-4 rounded-md bg-secondary p-4 text-foreground transition hover:-translate-y-1.5 hover:cursor-pointer sm:flex-row"
      onClick={() => router.push(`/projects/${id}`)}
    >
      <Image
        src={image}
        alt={`${title} image`}
        height={300}
        width={300}
        className="h-44 rounded-md object-cover max-sm:w-full sm:aspect-video"
      />
      <div>
        <h3 className="mb-1 text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted">{description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge key={index} className="bg-accent/15 dark:bg-accent/30">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
