import { Select, SelectProps } from '@arco-design/web-react';
import React, { ChangeEvent, useCallback } from 'react';
import { useToolbarContext } from '../context/ToolbarContext';

const defaultFontSizeOptions: SelectProps['options'] = [
  '12px',
  '13px',
  '14px',
  '15px',
  '16px',
  '19px',
  '22px',
  '24px',
  '29px',
  '32px',
  '40px',
  '48px',
];

export default function FontSize({ fontSizeOptions = defaultFontSizeOptions }) {
  const { fontSize, applyStyleText } = useToolbarContext();

  const onFontSizeSelect = useCallback(
    (e: ChangeEvent) => {
      applyStyleText?.({ 'font-size': (e.target as HTMLSelectElement).value });
    },
    [applyStyleText],
  );

  return (
    <Select
      className="li-editor-toolbar-widget"
      bordered={false}
      triggerProps={{
        popupStyle: {
          minWidth: 80,
        },
      }}
      value={fontSize}
      options={fontSizeOptions}
      onChange={onFontSizeSelect}
    />
  );
}
