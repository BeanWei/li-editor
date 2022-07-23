import { FORMAT_TEXT_COMMAND } from 'lexical';
import React from 'react';
import { Button, Tooltip } from '@arco-design/web-react';
import { IconItalic } from '@arco-design/web-react/icon';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useToolbarContext } from '../context/ToolbarContext';
import { IS_APPLE } from '../shared/environment';

export default function Italic() {
  const [editor] = useLexicalComposerContext();
  const { isItalic } = useToolbarContext();

  return (
    <Tooltip content={IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)'}>
      <Button
        className="li-editor-toolbar-widget"
        type={isItalic ? 'secondary' : 'text'}
        iconOnly
        icon={<IconItalic />}
        onClick={() => {
          editor?.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
      />
    </Tooltip>
  );
}
