import { Button, Popover, Tooltip } from '@arco-design/web-react';
import React, { useCallback, useState } from 'react';
import { useToolbarContext } from '../context/ToolbarContext';
import { ColorPicker, IconBgColor } from '../ui';

export default function BackgroundColor() {
  const { bgColor, applyStyleText } = useToolbarContext();
  const [popVisible, setPopVisible] = useState(false);

  const onBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText?.({ 'background-color': value });
    },
    [applyStyleText],
  );

  return (
    <Tooltip content="Background Color">
      <Popover
        popupVisible={popVisible}
        onVisibleChange={setPopVisible}
        content={
          <ColorPicker
            value={bgColor}
            onChange={(value) => {
              setPopVisible(false);
              onBgColorSelect(value);
            }}
          />
        }
        trigger="click"
        position="bottom"
        triggerProps={{
          popupStyle: { padding: 0 },
        }}
      >
        <Button
          className="li-editor-toolbar-widget"
          iconOnly
          icon={<IconBgColor color={bgColor} />}
          type={'text'}
        />
      </Popover>
    </Tooltip>
  );
}
