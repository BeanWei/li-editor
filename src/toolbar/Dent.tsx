import { INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND } from 'lexical';
import React from 'react';
import { Button, Dropdown, Space, Tooltip } from '@arco-design/web-react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { IconIndent, IconOutdent } from '../ui/Icon/index';

export default function Dent() {
  const [editor] = useLexicalComposerContext();

  return (
    <Tooltip content="Dent">
      <Dropdown
        trigger="click"
        position="bottom"
        droplist={
          <div
            style={{
              boxShadow: '0 2px 8px rgb(0 0 0 / 15%)',
              borderRadius: '5px',
              backgroundColor: '#FFFFFF',
            }}
          >
            <Space>
              <Tooltip content="Indent">
                <Button
                  className="li-editor-toolbar-widget"
                  type="text"
                  iconOnly
                  icon={<IconIndent />}
                  onClick={() => {
                    editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
                  }}
                />
              </Tooltip>
              <Tooltip content="Outdent">
                <Button
                  className="li-editor-toolbar-widget"
                  type="text"
                  iconOnly
                  icon={<IconOutdent />}
                  onClick={() => {
                    editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
                  }}
                />
              </Tooltip>
            </Space>
          </div>
        }
      >
        <Button className="li-editor-toolbar-widget" type="text" iconOnly icon={<IconIndent />} />
      </Dropdown>
    </Tooltip>
  );
}