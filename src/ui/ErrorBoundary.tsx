import * as React from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import './ErrorBoundary.css'

interface Props {
  children: JSX.Element
  onError: (error: Error) => void
}

export default function ErrorBoundary({ children, onError }: Props): JSX.Element {
  return (
    <ReactErrorBoundary
      fallback={
        <span className="li-editor-error-container">
          React crashed. Please,{' '}
          <a href="https://github.com/facebook/lexical/issues/new/choose">
            file a task
          </a>
          .
        </span>
      }
      onError={onError}>
      {children}
    </ReactErrorBoundary>
  )
}
