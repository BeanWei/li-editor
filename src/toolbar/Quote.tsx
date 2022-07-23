import { $createParagraphNode, $getSelection, $isRangeSelection } from 'lexical';
import React from 'react';
import { Button, Tooltip } from '@arco-design/web-react';
import { IconQuote } from '@arco-design/web-react/icon';
import { $createQuoteNode } from '@lexical/rich-text';
import { $wrapLeafNodesInElements } from '@lexical/selection';
import { useToolbarContext } from '../context/ToolbarContext';

export default function Quote() {
  const { activeEditor, isQuote } = useToolbarContext();

  return (
    <Tooltip content="Quote">
      <Button
        className="li-editor-toolbar-widget"
        type={isQuote ? 'secondary' : 'text'}
        iconOnly
        icon={<IconQuote />}
        onClick={() => {
          if (isQuote) {
            activeEditor?.update(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                $wrapLeafNodesInElements(selection, () => $createParagraphNode());
              }
            });
          } else {
            activeEditor?.update(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                $wrapLeafNodesInElements(selection, () => $createQuoteNode());
              }
            });
          }
        }}
      />
    </Tooltip>
  );
}
