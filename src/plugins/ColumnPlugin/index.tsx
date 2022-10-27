import type { EditorThemeClasses, Klass, LexicalEditor, LexicalNode } from 'lexical'
import * as React from 'react'

export type CellEditorConfig = Readonly<{
  namespace: string
  nodes?: ReadonlyArray<Klass<LexicalNode>>
  onError: (error: Error, editor: LexicalEditor) => void
  readOnly?: boolean
  theme?: EditorThemeClasses
}>

export interface CellContextShape {
  cellEditorConfig: null | CellEditorConfig
  cellEditorPlugins: null | JSX.Element | Array<JSX.Element>
  set: (
    cellEditorConfig: null | CellEditorConfig,
    cellEditorPlugins: null | JSX.Element | Array<JSX.Element>,
  ) => void
}

// @ts-expect-error: not sure why TS doesn't like using null as the value?
export const CellContext: React.Context<CellContextShape> = React.createContext({
  cellEditorConfig: null,
  cellEditorPlugins: null,
  set: () => {
    // Empty
  },
})
