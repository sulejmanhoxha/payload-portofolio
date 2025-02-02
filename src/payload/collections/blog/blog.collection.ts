import { formatSlug } from '@/utils/formatSlug'
import {
  BlocksFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  HTMLConverterFeature,
  InlineToolbarFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { Code } from '@/payload/blocks/Code/config'
import { File } from '@/payload/blocks/File/config'
import { MediaBlock } from '@/payload/blocks/MediaBlock/config'
import { Embed } from '@/payload/blocks/Embed/config'

export const BlogCollection: CollectionConfig = {
  slug: 'blogs',
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
  },
  defaultSort: '-publishedAt',
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
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      relationTo: 'users',
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'content',
              type: 'richText',
              label: false,
              required: true,
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
                  BlocksFeature({
                    blocks: [Code, MediaBlock, File, Embed],
                    inlineBlocks: [Code, MediaBlock, File, Embed],
                  }),

                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                  HorizontalRuleFeature(),
                  HTMLConverterFeature({}),
                ],
              }),
            },
            lexicalHTML('content', { name: 'content_html' }),
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'summary',
              type: 'textarea',
              label: 'Summary',
              required: true,
              admin: {
                placeholder: 'Enter a brief summary/excerpt for the post...',
                description: 'A short summary or snippet of the post content',
              },
            },
          ],
          label: 'Summary',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: false,
            }),
            MetaImageField({
              hasGenerateFn: false,
              relationTo: 'media',
            }),

            MetaDescriptionField({ hasGenerateFn: false }),
            PreviewField({
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },

    // lexicalHTML('content', { name: 'content_html' }),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
  // hooks: {
  //   afterChange: [revalidatePost],
  // },
}
