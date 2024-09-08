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
    </div>
  )
}
