import { FORMAT_TEXT_COMMAND } from 'lexical';
import React from 'react';
import { Button, Dropdown, Menu, Tooltip } from '@arco-design/web-react';
import { IconCode } from '@arco-design/web-react/icon';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useToolbarContext } from '../context/ToolbarContext';
import { IconMoreMark, IconSubscript, IconSuperscript } from '../ui';

export default function MoreMark() {
  const [editor] = useLexicalComposerContext();
  const { isSubscript, isSuperscript, isCode } = useToolbarContext();

  return (
    <Tooltip content="More mark text">
      <Dropdown
        trigger="click"
        droplist={
          <Menu
            selectedKeys={[
              isSubscript ? 'subscript' : '',
              isSuperscript ? 'superscript' : '',
              isCode ? 'code' : '',
            ].filter((key) => !!key)}
            onClickMenuItem={(key) => {
              switch (key) {
                case 'subscript':
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
                  break;
                case 'superscript':
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
                  break;
                case 'code':
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
                  break;
              }
            }}
          >
            <Menu.Item key="subscript">
              <IconSubscript /> Subscript
            </Menu.Item>
            <Menu.Item key="superscript">
              <IconSuperscript /> Superscript
            </Menu.Item>
            <Menu.Item key="code">
              <IconCode /> Code
            </Menu.Item>
          </Menu>
        }
      >
        <Button
          className="li-editor-toolbar-widget"
          iconOnly
          icon={<IconMoreMark />}
          type={'text'}
        />
      </Dropdown>
    </Tooltip>
  );
}
