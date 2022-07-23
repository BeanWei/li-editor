import { REDO_COMMAND } from 'lexical';
import React from 'react';
import { Button, Tooltip } from '@arco-design/web-react';
import { IconRedo } from '@arco-design/web-react/icon';
import { useToolbarContext } from '../context/ToolbarContext';
import { IS_APPLE } from '../shared/environment';

export default function Redo() {
  const { activeEditor, canRedo } = useToolbarContext();

  return (
    <Tooltip content={IS_APPLE ? 'Redo (⌘Y)' : 'Undo (Ctrl+Y)'}>
      <Button
        className="li-editor-toolbar-widget"
        iconOnly
        icon={<IconRedo />}
        type={canRedo ? 'secondary' : 'text'}
        disabled={!canRedo}
        onClick={() => {
          activeEditor?.dispatchCommand(REDO_COMMAND, undefined);
        }}
      />
    </Tooltip>
  );
}
