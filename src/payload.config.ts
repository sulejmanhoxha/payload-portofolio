import path from 'path'
import { HTMLConverterFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { seoPlugin } from '@payloadcms/plugin-seo'
import { BlogCollection } from '@/payload/collections/blog/blog.collection'
import { UsersCollection } from '@/payload/collections/users.collection'
import { ProjectsCollection } from '@/payload/collections/projects.collection'
import { MediaCollection } from '@/payload/collections/media.collection'
import { FilesCollection } from '@/payload/collections/files.collection'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    autoLogin: {
      email: 'dev@payloadcms.com',
      password: 'test',
      prefillOnly: true,
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    BlogCollection,
    UsersCollection,
    ProjectsCollection,
    MediaCollection,
    FilesCollection,
  ],
  // editor: lexicalEditor({
  //   features: ({ defaultFeatures }) => {
  //     return [
  //       ...defaultFeatures,
  //       HTMLConverterFeature({
  //         converters: ({ defaultConverters }) => [...defaultConverters],
  //       }),
  //     ]
  //   },
  // }),
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
    migrationDir: path.resolve(dirname, 'payload', 'migrations'),
  }),
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'dev@payloadcms.com',
          password: 'test',
        },
      })
    }
  },
  sharp,
  plugins: [
    // storage-adapter-placeholder
    seoPlugin({}),
  ],
})
