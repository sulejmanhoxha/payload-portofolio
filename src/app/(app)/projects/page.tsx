import { ProjectCard } from '@/components/ProjectCard'
import config from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function ProjectsPage() {
  const payload = await getPayload({ config })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
  })
  return (
    <div className="space-y-4">
      {projects.docs.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
