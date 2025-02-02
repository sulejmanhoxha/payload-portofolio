import { formatSlug } from '@/utils/formatSlug'
import { isValidUrl } from '@/utils/isValidUrl'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'

export const ProjectsCollection: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'technologies',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      validate: (value) => (isValidUrl(value) ? true : 'This is not a URL'),
    },
    {
      name: 'github',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      validate: (value) => (isValidUrl(value) ? true : 'This is not a URL'),
    },

    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
      }),
    },
    lexicalHTML('content', { name: 'content_html' }),
  ],
}
