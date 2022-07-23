import { createContext, useContext } from 'react';

type ContextToolbar = {
  canUndo?: boolean;
  canRedo?: boolean;
  blockType?: string;
  fontSize?: string;
  isBold?: boolean;
  isItalic?: boolean;
  isStrikethrough?: boolean;
  isUnderline?: boolean;
  isSubscript?: boolean;
  isSuperscript?: boolean;
  isCode?: boolean;
  fontColor?: string;
  bgColor?: string;
  applyStyleText?: (styles: Record<string, string>) => void;
};

export const ToolbarContext: React.Context<ContextToolbar> = createContext({});

export const useToolbarContext = (): ContextToolbar => {
  return useContext(ToolbarContext);
};
