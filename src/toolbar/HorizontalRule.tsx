import React from 'react';
import { Button, Tooltip } from '@arco-design/web-react';
import { IconMinus } from '@arco-design/web-react/icon';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';

export default function HorizontalRule() {
  const [editor] = useLexicalComposerContext();

  return (
    <Tooltip content="Horizontal Rule">
      <Button
        className="li-editor-toolbar-widget"
        type="text"
        iconOnly
        icon={<IconMinus />}
        onClick={() => {
          editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
        }}
      />
    </Tooltip>
  );
}
