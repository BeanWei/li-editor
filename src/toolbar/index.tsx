import { $isCodeNode, CODE_LANGUAGE_MAP } from '@lexical/code';
import { $isListNode, ListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isHeadingNode } from '@lexical/rich-text';
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  NodeKey,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import React, { useCallback, useEffect, useState } from 'react';
import { ToolbarContext } from '../context/ToolbarContext';
import { getSelectedNode } from '../utils/node';
import Align from './Align';
import BackgroundColor from './BackgroundColor';
import BlockFormat from './BlockFormat';
import BoldButton from './Bold';
import CheckList from './CheckList';
import Dent from './Dent';
import FontColor from './FontColor';
import FontSize from './FontSize';
import HorizontalRule from './HorizontalRule';
import './index.less';
import Italic from './Italic';
import MoreMark from './MoreMark';
import Quote from './Quote';
import Redo from './Redo';
import Strikethrough from './Strikethrough';
import Underline from './Underline';
import Undo from './Undo';

function Toolbar(props: React.PropsWithChildren) {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);
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
  const [alignType, setAlignType] = useState('');
  const [isCheckList, setIsCheckList] = useState(false);
  const [isQuote, setIsQuote] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState<string>('');

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsSubscript(selection.hasFormat('subscript'));
      setIsSuperscript(selection.hasFormat('superscript'));
      setIsCode(selection.hasFormat('code'));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      // if ($isLinkNode(parent) || $isLinkNode(node)) {
      //   setIsLink(true);
      // } else {
      //   setIsLink(false);
      // }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
          const type = parentList ? parentList.getListType() : element.getListType();
          setBlockType(type);
          setIsCheckList(type === 'check');
          setIsQuote(false);
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType();
          setBlockType(type);
          if ($isCodeNode(element)) {
            const language = element.getLanguage();
            setCodeLanguage(language ? CODE_LANGUAGE_MAP[language] || language : '');
            return;
          }
          setIsCheckList(false);
          setIsQuote(type === 'quote');
        }
      }

      // Handle buttons
      setFontSize($getSelectionStyleValueForProperty(selection, 'font-size', '15px'));
      setFontColor($getSelectionStyleValueForProperty(selection, 'color', '#262626'));
      setBgColor($getSelectionStyleValueForProperty(selection, 'background-color', '#FADB14'));
      // setFontFamily(
      //   $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'),
      // );
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

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [activeEditor, updateToolbar]);

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
        codeLanguage,
        fontColor,
        bgColor,
        alignType,
        isCheckList,
        isQuote,
        applyStyleText,
        activeEditor,
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
Toolbar.Align = Align;
Toolbar.Dent = Dent;
Toolbar.CheckList = CheckList;
Toolbar.Quote = Quote;
Toolbar.HorizontalRule = HorizontalRule;

export default Toolbar;
