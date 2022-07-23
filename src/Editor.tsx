import '@arco-design/web-react/dist/css/arco.css';
import './Editor.less';

import React, { useRef } from 'react';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { AutoScrollPlugin } from '@lexical/react/LexicalAutoScrollPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { useSharedHistoryContext } from './context/SharedHistoryContext';
import Nodes from './nodes';
import HorizontalRulePlugin from './plugins/HorizontalRulePlugin';
import theme from './themes';

interface EditorProps {
  namespace?: string;
  children?: React.ReactNode;
  placeholder?: string;
  isReadOnly?: boolean;
  onChange?: (editorState: any) => void;
}

function Editor(props: EditorProps) {
  const {
    namespace = 'li-editor',
    children,
    placeholder = '',
    isReadOnly = false,
    onChange,
  } = props;
  const { historyState } = useSharedHistoryContext();
  const scrollRef = useRef(null);

  return (
    <LexicalComposer
      initialConfig={{
        namespace,
        nodes: [...Nodes],
        theme,
        readOnly: isReadOnly,
        onError: (error) => {
          console.error(error);
        },
      }}
    >
      <div className="li-editor">
        {children}
        <div className="li-editor-container" ref={scrollRef}>
          <RichTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={placeholder}
            // initialEditorState={}
          />
          <AutoScrollPlugin scrollRef={scrollRef} />
          <OnChangePlugin
            onChange={(editorState) => {
              onChange?.(JSON.stringify(editorState));
            }}
            ignoreSelectionChange
          />
          <AutoFocusPlugin />
          <ClearEditorPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <LinkPlugin />
          <HorizontalRulePlugin />
          <HistoryPlugin externalHistoryState={historyState} />
        </div>
      </div>
    </LexicalComposer>
  );
}

export default Editor;

export { EditorProps };
