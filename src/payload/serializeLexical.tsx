import { LexicalNode } from 'lexical'

export function serializeLexical(nodes: LexicalNode | LexicalNode[]): string {
  // Ensure nodes is an array
  const nodeArray = Array.isArray(nodes) ? nodes : [nodes]

  return nodeArray
    .map((node) => {
      switch (node.getType()) {
        case 'code':
          const codeData = node.getData()
          return `<pre><code class="${codeData.language}">${codeData.code}</code></pre>`
        case 'mediaBlock':
          const mediaData = node.getData()
          return `<img src="${mediaData.url}" alt="${mediaData.alt}" />`
        // Add cases for other custom blocks as needed
        default:
          return node.getTextContent() // Fallback for other node types
      }
    })
    .join('')
}
