import type { CollectionConfig } from 'payload'

import path from 'path'
import { authenticated } from '@/payload/access/authenticated'
import { anyone } from '@/payload/access/anyone'

export const FilesCollection: CollectionConfig = {
  slug: 'files',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
  upload: {
    // Upload to a public directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve('public/uploads/files'),
  },
}
