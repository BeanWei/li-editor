import './index.less';

import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import React, { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $patchStyleText } from '@lexical/selection';
import { ToolbarContext } from '../context/ToolbarContext';
import BackgroundColor from './BackgroundColor';
import BlockFormat from './BlockFormat';
import BoldButton from './Bold';
import FontColor from './FontColor';
import FontSize from './FontSize';
import Italic from './Italic';
import MoreMark from './MoreMark';
import Redo from './Redo';
import Strikethrough from './Strikethrough';
import Underline from './Underline';
import Undo from './Undo';

function Toolbar(props: React.PropsWithChildren) {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');
  const [fontSize, setFontSize] = useState('15px');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [fontColor, setFontColor] = useState('#262626');
  const [bgColor, setBgColor] = useState('#FADB14');

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

  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      activeEditor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, styles);
        }
      });
    },
    [activeEditor],
  );

  return (
    <ToolbarContext.Provider
      value={{
        canUndo,
        canRedo,
        blockType,
        fontSize,
        isBold,
        isItalic,
        isStrikethrough,
        isUnderline,
        isSubscript,
        isSuperscript,
        isCode,
        fontColor,
        bgColor,
        applyStyleText,
      }}
    >
      <div className="li-editor-toolbar">{props.children}</div>
    </ToolbarContext.Provider>
  );
}

Toolbar.Undo = Undo;
Toolbar.Redo = Redo;
Toolbar.BlockFormat = BlockFormat;
Toolbar.FontSize = FontSize;
Toolbar.Bold = BoldButton;
Toolbar.Italic = Italic;
Toolbar.Strikethrough = Strikethrough;
Toolbar.Underline = Underline;
Toolbar.MoreMark = MoreMark;
Toolbar.FontColor = FontColor;
Toolbar.BackgroundColor = BackgroundColor;

export default Toolbar;
