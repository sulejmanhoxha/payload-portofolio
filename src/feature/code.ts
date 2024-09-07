import { codeConverter } from '@/feature/converter'
import type { Block } from 'payload'

export const languages = {
  ts: 'TypeScript',
  plaintext: 'Plain Text',
  tsx: 'TSX',
  js: 'JavaScript',
  jsx: 'JSX',
}

export const CodeBlock: Block = {
  slug: 'Code',
  admin: {
    jsx: '@/feature/converterClient.js#codeConverterClient',
  },
  jsx: codeConverter,
  fields: [
    {
      type: 'select',
      name: 'language',
      options: Object.entries(languages).map(([key, value]) => ({
        label: value,
        value: key,
      })),
      defaultValue: 'ts',
    },
    {
      admin: {
        components: {
          Field: './collections/Posts/CodeFields.js#Code',
        },
      },
      name: 'code',
      type: 'code',
    },
  ],
}
