import * as React from 'react'
import './Placeholder.css'

export default function Placeholder({ children }: {
  children: React.ReactNode
}): JSX.Element {
  return <div className="li-editor-placeholder">{children}</div>
}
