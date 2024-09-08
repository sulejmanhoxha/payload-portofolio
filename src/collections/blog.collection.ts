// import { CodeBlock } from '@/feature/code'
import { Code } from '@/blocks/Code/config'
import { formatSlug } from '@/utils/formatSlug'
import {
  BlocksFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'

export const BlogCollection: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      defaultValue: 'Sulejman Hoxha',
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: new Date(),
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    // {
    //   name: 'content',
    //   type: 'richText',
    //   editor: lexicalEditor({
    //     features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
    //   }),
    // },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          EXPERIMENTAL_TableFeature(),
          FixedToolbarFeature(),
          BlocksFeature({
            blocks: [Code],
          }),
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML('content', { name: 'content_html' }),
  ],
}
