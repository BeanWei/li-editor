import * as React from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { AutoScrollPlugin } from '@lexical/react/LexicalAutoScrollPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'

import { SharedHistoryContext, useSharedHistoryContext } from './context/SharedHistoryContext'
import Placeholder from './ui/Placeholder'
import ErrorBoundary from './ui/ErrorBoundary'
import ContentEditable from './ui/ContentEditable'
import Nodes from './nodes'
import Theme from './themes'

export default function LiEditor(): JSX.Element {
  const { historyState } = useSharedHistoryContext()
  const scrollRef = React.useRef(null)

  const initialConfig = {
    namespace: 'li-editor',
    nodes: [...Nodes],
    onError: (error: Error) => {
      throw error
    },
    theme: Theme,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <div className="li-editor-container">
          <AutoFocusPlugin />
          <ClearEditorPlugin />
          <HashtagPlugin />
          <AutoScrollPlugin scrollRef={scrollRef} />
          <HistoryPlugin externalHistoryState={historyState} />
          <RichTextPlugin
            contentEditable={
              <div className="li-editor-scroller">
                <div className="li-editor">
                  <ContentEditable />
                </div>
              </div>
            }
            placeholder={(
              <Placeholder>Enter some text</Placeholder>
            )}
            ErrorBoundary={ErrorBoundary}
          />
          <ListPlugin />
          <LinkPlugin />
          <CheckListPlugin />
          <TablePlugin />
        </div>
      </SharedHistoryContext>
    </LexicalComposer>
  )
}
