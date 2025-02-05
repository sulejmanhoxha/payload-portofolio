type Args = {
  params: Promise<{
    slug?: string
  }>
}
import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { generateMeta } from '@/utils/generateMeta'
import { LivePreviewListener } from '@/payload/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = projects.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

export default async function ProjectViewPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/projects/' + slug
  const project = await queryProjectBySlug({ slug })

  return (
    <>
      {draft && <LivePreviewListener />}

      <RichText className="mx-auto max-w-[48rem]" data={project.content} enableGutter={false} />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const project = await queryProjectBySlug({ slug })

  return generateMeta({ doc: project })
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
