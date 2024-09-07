import { BlogCard } from '@/components/BlogCard'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

export default async function BlogsPage() {
  const payload = await getPayloadHMR({
    config,
  })

  const data = await payload.find({
    collection: 'blogs',
  })

  if (!data) {
    return <div>No blogs at this moment.</div>
  }

  return (
    <div className="space-y-4">
      {data.docs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          date={blog.publishedAt}
          description={blog.summary}
          id={blog.slug}
        />
      ))}

      <BlogCard
        title="How to Build a Personal Website with Next.js"
        date="February 1, 2023"
        description="In this blog post, we will learn how to build a personal website using Next.js and Tailwind CSS."
        id="1"
      />
      <BlogCard
        title="How to Build a Personal Website with Next.js"
        date="February 1, 2023"
        description="In this blog post, we will learn how to build a personal website using Next.js and Tailwind CSS."
        id="2"
      />
      <BlogCard
        title="Build a Personal Website with Next.js and Tailwind CSS"
        date="February 1, 2023"
        description="Learn how to build a personal website using Next.js and Tailwind CSS."
        id="3"
      />
    </div>
  )
}
