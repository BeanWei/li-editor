import { FORMAT_TEXT_COMMAND } from 'lexical';
import React from 'react';
import { Button, Tooltip } from '@arco-design/web-react';
import { IconStrikethrough } from '@arco-design/web-react/icon';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useToolbarContext } from '../context/ToolbarContext';
import { IS_APPLE } from '../shared/environment';

export default function Strikethrough() {
  const [editor] = useLexicalComposerContext();
  const { isStrikethrough } = useToolbarContext();

  return (
    <Tooltip content={IS_APPLE ? 'Strikethrough (↑⌘X)' : 'Strikethrough (↑+Ctrl+X)'}>
      <Button
        className="li-editor-toolbar-widget"
        type={isStrikethrough ? 'secondary' : 'text'}
        iconOnly
        icon={<IconStrikethrough />}
        onClick={() => {
          editor?.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
      />
    </Tooltip>
  );
}
