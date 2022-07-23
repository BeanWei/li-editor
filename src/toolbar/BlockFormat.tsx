import { $createParagraphNode, $getSelection, $isRangeSelection } from 'lexical';
import React from 'react';
import { Select } from '@arco-design/web-react';
import { $createCodeNode } from '@lexical/code';
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, $createQuoteNode, HeadingTagType } from '@lexical/rich-text';
import { $wrapLeafNodesInElements } from '@lexical/selection';
import { useToolbarContext } from '../context/ToolbarContext';

const blockTypeToBlockName = {
  paragraph: 'Normal',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  bullet: 'Bulleted List',
  number: 'Numbered List',
  check: 'Check List',
  quote: 'Quote',
  code: 'Code Block',
};

export default function BlockFormat() {
  const [editor] = useLexicalComposerContext();
  const { blockType } = useToolbarContext();

  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatCheckList = () => {
    if (blockType !== 'check') {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          if (selection.isCollapsed()) {
            $wrapLeafNodesInElements(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection.insertRawText(textContent);
          }
        }
      });
    }
  };

  return (
    <Select
      className="li-editor-toolbar-widget"
      bordered={false}
      triggerProps={{
        popupStyle: {
          minWidth: 140,
        },
      }}
      value={blockType}
      onChange={(value) => {
        switch (value) {
          case 'paragraph':
            formatParagraph();
            break;
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
            formatHeading(value);
            break;
          case 'bullet':
            formatBulletList();
            break;
          case 'check':
            formatCheckList();
            break;
          case 'number':
            formatNumberedList();
            break;
          case 'quote':
            formatQuote();
            break;
          case 'code':
            formatCode();
            break;
        }
      }}
    >
      {Object.entries(blockTypeToBlockName).map(([value, label]) => {
        return (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        );
      })}
    </Select>
  );
}
