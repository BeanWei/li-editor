import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import React, { useCallback, useEffect, useState } from 'react';
import { ToolbarContext } from '../context/ToolbarContext';
import BoldButton from './BoldButton';
import './index.less';

function Toolbar(props: React.PropsWithChildren) {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isBold, setIsBold] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
    }
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, updateToolbar]);

  return (
    <ToolbarContext.Provider
      value={{
        isBold,
      }}
    >
      <div className="li-editor-toolbar">{props.children}</div>
    </ToolbarContext.Provider>
  );
}

Toolbar.BoldButton = BoldButton;

export default Toolbar;
