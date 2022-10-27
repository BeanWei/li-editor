import type { LexicalNode, NodeKey, SerializedLexicalNode, Spread } from 'lexical'
import { DecoratorNode } from 'lexical'

export interface Column {
  json: string
}

export type Columns = Array<Column>

export type SerializedColumnNode = Spread<
  {
    columns: Columns
    type: 'column'
    version: 1
  },
  SerializedLexicalNode
>

export const cellHtmlCache: Map<string, string> = new Map()

export class ColumnNode extends DecoratorNode<JSX.Element> {
  __columns: Columns

  constructor(columns?: Columns, key?: NodeKey) {
    super(key)
    this.__columns = columns || []
  }

  static getType(): string {
    return 'column'
  }

  static clone(node: ColumnNode): ColumnNode {
    return new ColumnNode(Array.from(node.__columns), node.__key)
  }

  static importJSON(serializedNode: SerializedColumnNode): ColumnNode {
    return $createColumnNode(serializedNode.columns)
  }

  exportJSON(): SerializedColumnNode {
    return {
      columns: this.__columns,
      type: 'column',
      version: 1,
    }
  }

  createDOM(): HTMLElement {
    const div = document.createElement('div')
    div.className = `li-editor-column li-editor-column-${this.__columns.length}`
    return div
  }

  updateDom(): false {
    return false
  }
}

export function $isColumnNode(
  node: LexicalNode | null | undefined,
): node is ColumnNode {
  return node instanceof ColumnNode
}

export function $createColumnNode(columns: Columns): ColumnNode {
  return new ColumnNode(columns)
}
