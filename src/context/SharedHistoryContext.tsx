import type { HistoryState } from '@lexical/react/LexicalHistoryPlugin'
import { createEmptyHistoryState } from '@lexical/react/LexicalHistoryPlugin'
import * as React from 'react'

interface ContextShape {
  historyState?: HistoryState
}

const Context: React.Context<ContextShape> = React.createContext({})

export const SharedHistoryContext = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const historyContext = React.useMemo(
    () => ({ historyState: createEmptyHistoryState() }),
    [],
  )
  return <Context.Provider value={historyContext}>{children}</Context.Provider>
}

export const useSharedHistoryContext = (): ContextShape => {
  return React.useContext(Context)
}
