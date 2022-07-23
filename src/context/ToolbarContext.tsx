import { LexicalEditor } from 'lexical';
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
  codeLanguage?: string;
  fontColor?: string;
  bgColor?: string;
  alignType?: string;
  isCheckList?: boolean;
  isQuote?: boolean;
  applyStyleText?: (styles: Record<string, string>) => void;
  activeEditor?: LexicalEditor;
};

export const ToolbarContext: React.Context<ContextToolbar> = createContext({});

export const useToolbarContext = (): ContextToolbar => {
  return useContext(ToolbarContext);
};
