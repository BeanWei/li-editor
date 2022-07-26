import { Button, Popover, Tooltip } from '@arco-design/web-react';
import React, { useCallback, useState } from 'react';
import { useToolbarContext } from '../context/ToolbarContext';
import { ColorPicker, IconFontColor } from '../ui';

export default function FontColor() {
  const { fontColor, applyStyleText } = useToolbarContext();
  const [popVisible, setPopVisible] = useState(false);

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText?.({ color: value });
    },
    [applyStyleText],
  );

  return (
    <Tooltip content="Text Color">
      <Popover
        popupVisible={popVisible}
        onVisibleChange={setPopVisible}
        content={
          <ColorPicker
            value={fontColor}
            onChange={(value) => {
              setPopVisible(false);
              onFontColorSelect(value);
            }}
            defaultColor="#262626"
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
          icon={<IconFontColor color={fontColor} />}
          type={'text'}
        />
      </Popover>
    </Tooltip>
  );
}
