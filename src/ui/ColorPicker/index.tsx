import React from 'react';
import { basicColors } from './constant';
import './index.less';

function ColorItem(props: {
  color: string;
  isActive?: boolean;
  onClick?: (value: string) => void;
}) {
  if (!props.color || props.color === 'transparent') {
    return (
      <div
        className={`li-editor-colorpicker-group-item li-editor-colorpicker-group-item-special li-editor-colorpicker-group-item-border`}
        onClick={() => props.onClick?.('transparent')}
      >
        <span style={{ backgroundColor: 'transparent' }} />
      </div>
    );
  }
  return (
    <div
      className={`li-editor-colorpicker-group-item${
        props.color === '#FAFAFA' || props.color === '#FFFFFF'
          ? ' li-editor-colorpicker-group-item-border'
          : ''
      }`}
      onClick={() => props.onClick?.(props.color)}
    >
      <span style={{ backgroundColor: props.color }}>
        {props.isActive && (
          <svg
            viewBox="0 0 18 18"
            style={{
              fill:
                props.color === '#FAFAFA' || props.color === '#FFFFFF'
                  ? 'rgb(140, 140, 140)'
                  : 'rgb(255, 255, 255)',
            }}
          >
            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
          </svg>
        )}
      </span>
    </div>
  );
}

export default function ColorPicker(props: {
  value?: string;
  onChange?: (value: string) => void;
  defaultColor?: string;
}) {
  return (
    <div className="li-editor-colorpicker">
      <div
        className="li-editor-colorpicker-default"
        onClick={() => props.onChange?.(props.defaultColor || '')}
      >
        <ColorItem color={props.defaultColor || ''} />
        <span style={{ marginLeft: 8, lineHeight: 2 }}>
          {props.defaultColor ? 'Default' : 'No Color'}
        </span>
      </div>
      <div className="li-editor-colorpicker-group">
        {basicColors.map((color) => {
          return (
            <ColorItem
              key={color}
              color={color}
              isActive={props.value === color}
              onClick={(value) => props.onChange?.(value)}
            />
          );
        })}
      </div>
    </div>
  );
}
