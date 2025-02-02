import { anyone } from '@/payload/access/anyone'
import { authenticated } from '@/payload/access/authenticated'
import path from 'path'
import { CollectionConfig } from 'payload'

export const MediaCollection: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
      admin: {
        description: 'A caption for the media',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'video/*'],
    // Use webp for all media for maximum compression
    formatOptions: { format: 'webp' },
    // Upload to a public directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve('public/uploads/media'),
  },
}
