import { authenticated } from '@/payload/access/authenticated'
import { authenticatedOrPublished } from '@/payload/access/authenticatedOrPublished'
import { slugField } from '@/payload/collections/blog/slug.field'
import { generatePreviewPath } from '@/utils/generatePreviewPath'
import { isValidUrl } from '@/utils/isValidUrl'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { CollectionConfig } from 'payload'
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
import { Code } from '@/payload/blocks/Code/config'
import { MediaBlock } from '@/payload/blocks/MediaBlock/config'
import {
  revalidateProject,
  revalidateProjectDelete,
} from '@/payload/collections/project/hooks/revalidate'

export const ProjectsCollection: CollectionConfig = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultSort: '-publishedAt',
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
    afterChange: [revalidateProject],
    afterDelete: [revalidateProjectDelete],
  },
  admin: {
    useAsTitle: 'name',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'projects',
          req,
        })

        req.payload.logger.info(`${path} live preview deosnt work here`)

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'projects',
        req,
      }),
  },
  fields: [
    ...slugField('name'),
    {
      name: 'name',
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
      type: 'row',
      fields: [
        {
          name: 'url',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
          validate: (value: any) => (isValidUrl(value) ? true : 'This is not a URL'),
        },
        {
          name: 'github',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
          validate: (value: any) => (isValidUrl(value) ? true : 'This is not a URL'),
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              label: false,
              required: true,
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
          ],
        },
        {
          label: 'Description',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: {
                position: 'sidebar',
              },
            },
          ],
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
  ],
}
