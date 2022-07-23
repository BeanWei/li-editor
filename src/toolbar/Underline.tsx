import { FORMAT_TEXT_COMMAND } from 'lexical';
import React from 'react';
import { Button, Tooltip } from '@arco-design/web-react';
import { IconUnderline } from '@arco-design/web-react/icon';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useToolbarContext } from '../context/ToolbarContext';
import { IS_APPLE } from '../shared/environment';

export default function Underline() {
  const [editor] = useLexicalComposerContext();
  const { isUnderline } = useToolbarContext();

  return (
    <Tooltip content={IS_APPLE ? 'Underline (⌘U)' : 'Underline (Ctrl+U)'}>
      <Button
        className="li-editor-toolbar-widget"
        type={isUnderline ? 'secondary' : 'text'}
        iconOnly
        icon={<IconUnderline />}
        onClick={() => {
          editor?.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
      />
    </Tooltip>
  );
}