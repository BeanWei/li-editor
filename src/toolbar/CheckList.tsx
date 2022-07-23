import React from 'react';
import { Button, Tooltip } from '@arco-design/web-react';
import { IconCheckSquare } from '@arco-design/web-react/icon';
import { INSERT_CHECK_LIST_COMMAND, REMOVE_LIST_COMMAND } from '@lexical/list';
import { useToolbarContext } from '../context/ToolbarContext';

export default function CheckList() {
  const { activeEditor, isCheckList } = useToolbarContext();

  return (
    <Tooltip content="Check List">
      <Button
        className="li-editor-toolbar-widget"
        type={isCheckList ? 'secondary' : 'text'}
        iconOnly
        icon={<IconCheckSquare />}
        onClick={() => {
          if (isCheckList) {
            activeEditor?.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
          } else {
            activeEditor?.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
          }
        }}
      />
    </Tooltip>
  );
}
