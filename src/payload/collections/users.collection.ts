import { CollectionConfig } from 'payload'

export const UsersCollection: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [],
}
