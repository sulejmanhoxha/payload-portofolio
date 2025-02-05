import config from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function BlogPage() {
  const payload = await getPayload({ config })
  const blogs = await payload.find({
    collection: 'blogs',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
  })

  return (
    <div className="pb-24 pt-24">
      <div className="container mb-16">
        <div className="prose max-w-none dark:prose-invert">
          <h1>Posts</h1>
        </div>
      </div>

      {blogs.docs.map((post) => (
        <div key={post.slug} className="mb-16">
          <Link href={`/blogs/${post.slug}`}>
            <h2 className="text-2xl font-bold">{post.id}</h2>
          </Link>
          <p className="text-gray-500 dark:text-gray-400">{post.summary}</p>
        </div>
      ))}
    </div>
  )
}
