import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Project } from '@/payload-types'

export const revalidateProject: CollectionAfterChangeHook<Project> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/projects/${doc.slug}`

      payload.logger.info(`Revalidating project at path: ${path}`)

      revalidatePath(path)
      revalidateTag('project-sitemap')
    }

    // If the project was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/projects/${previousDoc.slug}`

      payload.logger.info(`Revalidating old project at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('project-sitemap')
    }
  }
  return doc
}

export const revalidateProjectDelete: CollectionAfterDeleteHook<Project> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/project/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('project-sitemap')
  }

  return doc
}
