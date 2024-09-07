import { getPayloadHMR } from '@payloadcms/next/utilities'
import { notFound } from 'next/navigation'
import config from '@payload-config'
// import DOMPurify from 'dompurify'

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
        className="prose prose-base prose-slate mt-16 max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  )
}
