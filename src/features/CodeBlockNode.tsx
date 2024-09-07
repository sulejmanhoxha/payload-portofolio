import { $applyNodeReplacement, DecoratorNode } from 'lexical'

export class CodeBlockNode extends DecoratorNode<React.ReactElement> {
  static clone(node: CodeBlockNode): CodeBlockNode {
    return new CodeBlockNode(node.__key)
  }

  static getType(): string {
    return 'codeBlock'
  }

  static importDOM(): DOMConversionMap | null {
    return {
      pre: () => ({
        conversion: $yourConversionMethod,
        priority: 0,
      }),
    }
  }

  static importJSON(serializedNode: SerializedCodeBlockNode): CodeBlockNode {
    return $createCodeBlockNode()
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = document.createElement('pre')
    return element
  }

  decorate(): React.ReactElement {
    return <CodeBlockComponent nodeKey={this.__key} />
  }

  exportDOM(): DOMExportOutput {
    return { element: document.createElement('pre') }
  }

  exportJSON(): SerializedLexicalNode {
    return {
      type: 'codeBlock',
      version: 1,
    }
  }

  getTextContent(): string {
    return '\n'
  }

  isInline(): false {
    return false
  }

  updateDOM(): boolean {
    return false
  }
}

function $yourConversionMethod(): DOMConversionOutput {
  return { node: $createCodeBlockNode() }
}

export function $createCodeBlockNode(): CodeBlockNode {
  return $applyNodeReplacement(new CodeBlockNode())
}

export function $isCodeBlockNode(node: LexicalNode | null | undefined): node is CodeBlockNode {
  return node instanceof CodeBlockNode
}
