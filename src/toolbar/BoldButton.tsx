import React from 'react';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Button, Tooltip } from '@arco-design/web-react';
import { useToolbarContext } from '../context/ToolbarContext';
import { IS_APPLE } from '../shared/environment';
import { IconBold } from '../icons';

export default function BoldButton() {
  const [editor] = useLexicalComposerContext();
  const { isBold } = useToolbarContext();

  return (
    <Tooltip content={IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)'}>
      <Button
        type={isBold ? 'secondary' : 'text'}
        iconOnly
        icon={<IconBold />}
        className="li-editor-toolbar-widget"
        onClick={() => {
          editor?.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
      />
    </Tooltip>
  );
}
