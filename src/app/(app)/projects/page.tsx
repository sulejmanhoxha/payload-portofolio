import { ProjectCard } from '@/components/ProjectCard'

export default function ProjectsPage() {
  return (
    <div className="space-y-4">
      <h1>Comming soon...</h1>
      <ProjectCard
        title="How to Build a Personal Website with Next.js"
        image="/projects/placeholder.jpg"
        description="In this blog post, we will learn how to build a personal website using Next.js and Tailwind CSS."
        technologies={['NextJS', 'Tailwind CSS']}
        id="1"
      />
      <ProjectCard
        title="How to Build a Personal Website with Next.js"
        image="/projects/placeholder.jpg"
        description="In this blog post, we will learn how to build a personal website using Next.js and Tailwind CSS."
        technologies={['NextJS', 'Tailwind CSS']}
        id="2"
      />
      <ProjectCard
        title="Build a Personal Website with Next.js and Tailwind CSS"
        image="/projects/placeholder.jpg"
        technologies={['NextJS', 'Tailwind CSS']}
        description="Learn how to build a personal website using Next.js and Tailwind CSS."
        id="3"
      />
    </div>
  )
}
