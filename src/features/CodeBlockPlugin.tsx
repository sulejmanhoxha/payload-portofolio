'use client'

import { createCommand, $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js'
import { useEffect } from 'react'
import { $createCodeBlockNode } from '../nodes/CodeBlockNode'

export const INSERT_CODEBLOCK_COMMAND = createCommand('INSERT_CODEBLOCK_COMMAND')

export const CodeBlockPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INSERT_CODEBLOCK_COMMAND,
      () => {
        const selection = $getSelection()
        if (!$isRangeSelection(selection)) {
          return false
        }
        const newCodeBlockNode = $createCodeBlockNode()
        $insertNodeToNearestRoot(newCodeBlockNode)
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )
  }, [editor])

  return null
}
