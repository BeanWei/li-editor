import * as React from 'react'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import './ContentEditable.css'

export default function LexicalContentEditable(): JSX.Element {
  return <ContentEditable className="li-editor-contenteditable" />
}
