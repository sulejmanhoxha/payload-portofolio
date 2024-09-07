'use client'

import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import { CodeBlockNode } from './nodes/CodeBlockNode'
import { CodeBlockPlugin } from './plugins/CodeBlockPlugin'

export const CodeBlockFeature = createClientFeature({
  nodes: [CodeBlockNode],
  plugins: [CodeBlockPlugin],
  toolbarFixed: {
    groups: [
      toolbarAddDropdownGroupWithItems([
        {
          ChildComponent: CodeBlockIcon,
          key: 'codeBlock',
          label: ({ i18n }) => i18n.t('lexical:codeBlock:label'),
          onSelect: ({ editor }) => {
            editor.dispatchCommand(INSERT_CODEBLOCK_COMMAND, undefined)
          },
        },
      ]),
    ],
  },
})
