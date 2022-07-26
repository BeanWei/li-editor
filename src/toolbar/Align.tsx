import { Button, Dropdown, Space, Tooltip } from '@arco-design/web-react';
import { IconAlignCenter, IconAlignLeft, IconAlignRight } from '@arco-design/web-react/icon';
import { FORMAT_ELEMENT_COMMAND } from 'lexical';
import React from 'react';
import { useToolbarContext } from '../context/ToolbarContext';
import { IconAlignJustify } from '../ui';

export default function Align() {
  const { activeEditor, alignType } = useToolbarContext();

  return (
    <Tooltip content="Alignment">
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
              <Tooltip content="Alignment Left">
                <Button
                  className="li-editor-toolbar-widget"
                  type={alignType === 'left' ? 'secondary' : 'text'}
                  iconOnly
                  icon={<IconAlignLeft />}
                  onClick={() => {
                    activeEditor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
                  }}
                />
              </Tooltip>
              <Tooltip content="Alignment Center">
                <Button
                  className="li-editor-toolbar-widget"
                  type={alignType === 'center' ? 'secondary' : 'text'}
                  iconOnly
                  icon={<IconAlignCenter />}
                  onClick={() => {
                    activeEditor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
                  }}
                />
              </Tooltip>
              <Tooltip content="Alignment Right">
                <Button
                  className="li-editor-toolbar-widget"
                  type={alignType === 'right' ? 'secondary' : 'text'}
                  iconOnly
                  icon={<IconAlignRight />}
                  onClick={() => {
                    activeEditor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
                  }}
                />
              </Tooltip>
              <Tooltip content="Alignment Justify">
                <Button
                  className="li-editor-toolbar-widget"
                  type={alignType === 'justify' ? 'secondary' : 'text'}
                  iconOnly
                  icon={<IconAlignJustify />}
                  onClick={() => {
                    activeEditor?.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
                  }}
                />
              </Tooltip>
            </Space>
          </div>
        }
      >
        <Button
          className="li-editor-toolbar-widget"
          type={alignType ? 'secondary' : 'text'}
          iconOnly
          icon={
            alignType ? (
              {
                left: <IconAlignLeft />,
                center: <IconAlignCenter />,
                right: <IconAlignRight />,
                justify: <IconAlignJustify />,
              }[alignType]
            ) : (
              <IconAlignLeft />
            )
          }
        />
      </Dropdown>
    </Tooltip>
  );
}
