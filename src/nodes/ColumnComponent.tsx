import type { EditorThemeClasses, LexicalEditor, NodeKey } from 'lexical'
import * as React from 'react'
import { LexicalNestedComposer } from '@lexical/react/LexicalNestedComposer'
import { CellContext } from '../plugins/ColumnPlugin'
import type { Columns } from './ColumnNode'

function ColumnCellEditor({ cellEditor }: { cellEditor: LexicalEditor }) {
  const { cellEditorConfig, cellEditorPlugins } = React.useContext(CellContext)

  if (cellEditorPlugins === null || cellEditorConfig === null)
    return null

  return (
    <LexicalNestedComposer
      initialEditor={cellEditor}
      initialTheme={cellEditorConfig.theme}
      initialNodes={cellEditorConfig.nodes}
      skipCollabChecks={true}>
      {cellEditorPlugins}
    </LexicalNestedComposer>
  )
}

export default function ColumnComponent({
  nodeKey,
  columns,
  theme,
}: {
  nodeKey: NodeKey
  columns: Columns
  theme: EditorThemeClasses
}) {
  const { cellEditorConfig } = React.useContext(CellContext)
}
