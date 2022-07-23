import { UNDO_COMMAND } from 'lexical';
import React from 'react';
import { Button, Tooltip } from '@arco-design/web-react';
import { IconUndo } from '@arco-design/web-react/icon';
import { useToolbarContext } from '../context/ToolbarContext';
import { IS_APPLE } from '../shared/environment';

export default function Undo() {
  const { activeEditor, canUndo } = useToolbarContext();

  return (
    <Tooltip content={IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'}>
      <Button
        className="li-editor-toolbar-widget"
        iconOnly
        icon={<IconUndo />}
        type="text"
        disabled={!canUndo}
        onClick={() => {
          activeEditor?.dispatchCommand(UNDO_COMMAND, undefined);
        }}
      />
    </Tooltip>
  );
}
