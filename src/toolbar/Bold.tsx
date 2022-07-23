import { FORMAT_TEXT_COMMAND } from 'lexical';
import React from 'react';
import { Button, Tooltip } from '@arco-design/web-react';
import { IconBold } from '@arco-design/web-react/icon';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useToolbarContext } from '../context/ToolbarContext';
import { IS_APPLE } from '../shared/environment';

export default function Bold() {
  const [editor] = useLexicalComposerContext();
  const { isBold } = useToolbarContext();

  return (
    <Tooltip content={IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)'}>
      <Button
        className="li-editor-toolbar-widget"
        type={isBold ? 'secondary' : 'text'}
        iconOnly
        icon={<IconBold />}
        onClick={() => {
          editor?.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
      />
    </Tooltip>
  );
}