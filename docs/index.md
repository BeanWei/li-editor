## Hello li-editor!

```tsx
import { Editor, Toolbar } from 'li-editor';
import React from 'react';

export default () => {
  return (
    <Editor>
      <Toolbar>
        <Toolbar.Undo />
        <Toolbar.Redo />
        <Toolbar.BlockFormat />
        <Toolbar.FontSize />
        <Toolbar.Bold />
        <Toolbar.Italic />
        <Toolbar.Strikethrough />
        <Toolbar.Underline />
        <Toolbar.MoreMark />
        <Toolbar.FontColor />
        <Toolbar.BackgroundColor />
        <Toolbar.Align />
        <Toolbar.Dent />
        <Toolbar.CheckList />
        <Toolbar.Quote />
        <Toolbar.HorizontalRule />
      </Toolbar>
    </Editor>
  );
};
```
