import { createContext, useContext } from 'react';

type ContextToolbar = {
  isBold?: boolean;
};

export const ToolbarContext: React.Context<ContextToolbar> = createContext({});

export const useToolbarContext = (): ContextToolbar => {
  return useContext(ToolbarContext);
};
