import React from 'react';
import { Button, Tooltip } from '@arco-design/web-react';
import { IconMinus } from '@arco-design/web-react/icon';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import { useToolbarContext } from '../context/ToolbarContext';

export default function HorizontalRule() {
  const { activeEditor } = useToolbarContext();

  return (
    <Tooltip content="Horizontal Rule">
      <Button
        className="li-editor-toolbar-widget"
        type="text"
        iconOnly
        icon={<IconMinus />}
        onClick={() => {
          activeEditor?.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
        }}
      />
    </Tooltip>
  );
}
