import { getPayloadHMR } from '@payloadcms/next/utilities'
import { notFound } from 'next/navigation'
import config from '@payload-config'
// import DOMPurify from 'dompurify'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params

  const payload = await getPayloadHMR({
    config,
  })

  const data = await payload.find({
    collection: 'blogs',
    where: {
      slug: { equals: slug }, // Updated to match expected type
    },
  })

  if (!data) {
    notFound()
  }

  const title = data.docs[0].title
  const description = data.docs[0].summary

  return {
    title,
    description,
  }
}

export async function generateStaticParams() {
  const payload = await getPayloadHMR({
    config,
  })

  const data = await payload.find({
    collection: 'blogs',
  })

  if (!data) {
    return []
  }

  return data.docs.map((blog) => ({
    slug: blog.slug,
  }))
}

export default async function BlogViewPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  const payload = await getPayloadHMR({
    config,
  })

  const data = await payload.find({
    collection: 'blogs',
    where: {
      slug: { equals: slug }, // Updated to match expected type
    },
  })

  if (!data) {
    notFound()
  }

  // Assuming your content is stored in a field named "content"
  const content = data.docs[0].content_html || ''
  console.log(content)
  //   const sanitizedContent = DOMPurify.sanitize(content)

  return (
    <section>
      {/* <main
        className="prose prose-base prose-slate mt-16 max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      /> */}

      <div
        className="prose prose-base prose-slate dark:prose-invert mt-16 max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  )
}
