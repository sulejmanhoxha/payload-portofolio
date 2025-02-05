import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  IndentFeature,
  InlineCodeFeature,
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
import { MediaBlock } from '@/payload/blocks/MediaBlock/config'
import { authenticated } from '@/payload/access/authenticated'
import { authenticatedOrPublished } from '@/payload/access/authenticatedOrPublished'
import { slugField } from '@/payload/collections/blog/slug.field'
import { generatePreviewPath } from '@/utils/generatePreviewPath'
import { revalidateBlog, revalidateDelete } from '@/payload/collections/blog/hooks/revalidate'

export const BlogCollection: CollectionConfig = {
  slug: 'blogs',
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'blogs',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'blogs',
        req,
      }),
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // defaultPopulate: {
  //   title: true,
  //   slug: true,
  //   meta: {
  //     image: true,
  //     description: true,
  //   },
  // },
  defaultSort: '-publishedAt',
  fields: [
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
    // {
    //   name: 'populatedAuthors',
    //   type: 'array',
    //   access: {
    //     update: () => false,
    //   },
    //   admin: {
    //     disabled: true,
    //     readOnly: true,
    //   },
    //   fields: [
    //     {
    //       name: 'id',
    //       type: 'text',
    //     },
    //     {
    //       name: 'name',
    //       type: 'text',
    //     },
    //   ],
    // },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content',
              type: 'richText',
              label: false,
              required: true,
              // editor: lexicalEditor({
              //   features: ({ defaultFeatures }) => [
              //     ...defaultFeatures,
              //     HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
              //     BlocksFeature({
              //       blocks: [Code, MediaBlock, File, Embed],
              //       inlineBlocks: [Code, MediaBlock, File, Embed],
              //     }),

              //     FixedToolbarFeature(),
              //     InlineToolbarFeature(),
              //     HorizontalRuleFeature(),
              //     HTMLConverterFeature({}),
              //   ],
              // }),
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
                    BlocksFeature({ blocks: [Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                    LinkFeature(),
                    OrderedListFeature(),
                    UnorderedListFeature(),
                    IndentFeature(),
                    InlineCodeFeature(),
                  ]
                },
              }),
            },
            // lexicalHTML('content', { name: 'content_html' }),
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
              hasGenerateFn: true,
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
    ...slugField(),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  hooks: {
    afterChange: [revalidateBlog],
    afterDelete: [revalidateDelete],
  },
}
