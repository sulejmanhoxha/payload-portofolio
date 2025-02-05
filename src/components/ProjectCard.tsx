'use client'
import { Badge } from '@/components/ui/badge'
import { Project } from '@/payload-types'
import { Media } from '@/payload/blocks/MediaBlock/Media'
import { useRouter } from 'next/navigation'

export function ProjectCard({ project }: { project: Project }) {
  const router = useRouter()
  return (
    <div
      className="flex flex-col gap-4 rounded-md bg-secondary p-4 text-foreground transition hover:-translate-y-1.5 hover:cursor-pointer sm:flex-row"
      onClick={() => router.push(`/projects/${project.slug}`)}
    >
      {project.image && typeof project.image !== 'string' && (
        <Media
          fill
          className="h-44 rounded-md object-cover max-sm:w-full sm:aspect-video"
          resource={project.image}
        />
      )}
      <div>
        <h3 className="mb-1 text-lg font-medium">{project.name}</h3>
        <p className="text-sm text-muted">{project.description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <Badge key={index} className="bg-accent/15 dark:bg-accent/30">
              {tech.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
