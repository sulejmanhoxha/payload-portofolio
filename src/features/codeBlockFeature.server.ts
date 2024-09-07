import { createServerFeature } from '@payloadcms/richtext-lexical'

export const CodeBlockFeature = createServerFeature({
  feature: {
    key: 'codeBlock',
    nodes: [
      createNode({
        node: CodeBlockNode,
        converters: {
          html: {
            converter: () => '<pre><code></code></pre>',
            nodeTypes: [CodeBlockNode.getType()],
          },
        },
      }),
    ],
    markdownTransformers: [
      {
        type: 'element',
        dependencies: [CodeBlockNode],
        export: (node) => {
          if (!$isCodeBlockNode(node)) {
            return null
          }
          return '```'
        },
        regExp: /^```$/,
        replace: (parentNode) => {
          const node = $createCodeBlockNode()
          if (node) {
            parentNode.replace(node)
          }
        },
      },
    ],
  },
})
