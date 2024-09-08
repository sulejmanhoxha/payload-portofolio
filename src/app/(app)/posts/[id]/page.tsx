import { getPayloadHMR } from '@payloadcms/next/utilities'
import { notFound } from 'next/navigation'
import config from '@payload-config'

export default async function BlogViewPage({ params }: { params: { id: string } }) {
  const { id } = params

  const payload = await getPayloadHMR({
    config,
  })

  const data = await payload.findByID({
    collection: 'blogs',
    id,
  })

  if (!data) {
    notFound()
  }

  // Assuming your content is stored in a field named "content"
  const content = data.content_html || ''

  return (
    <section>
      <main className="prose prose-base prose-slate dark:prose-invert mt-16 max-w-none">
        {content}
      </main>
    </section>
  )
}
