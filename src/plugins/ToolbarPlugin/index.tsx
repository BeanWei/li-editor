import * as React from 'react'
import { CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, REDO_COMMAND, SELECTION_CHANGE_COMMAND, UNDO_COMMAND } from 'lexical'
import {
  mergeRegister,
} from '@lexical/utils'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { IS_APPLE } from '../../utils/environment'
import IconUndo from '~icons/ri/arrow-go-back-fill'
import IconRedo from '~icons/ri/arrow-go-forward-fill'

export default function ToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = React.useState(editor)
  // const [selectedElementKey, setSelectedElementKey] = React.useState<NodeKey | null>(
  //   null,
  // )
  const [canUndo, setCanUndo] = React.useState(false)
  const [canRedo, setCanRedo] = React.useState(false)
  const [isEditable, setIsEditable] = React.useState(() => editor.isEditable())

  const updateToolbar = React.useCallback(() => {

  }, [activeEditor])

  React.useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar()
        setActiveEditor(newEditor)
        return false
      },
      COMMAND_PRIORITY_CRITICAL,
    )
  }, [editor, updateToolbar])

  React.useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable)
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    )
  }, [activeEditor, editor, updateToolbar])

  return (
    <div className="li-editor-toolbar">
      <button
        disabled={!canUndo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
        title={IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'}
        className="li-editor-toolbar-item spaced"
        aria-label="Undo"
      >
        <IconUndo />
      </button>
      <button
        disabled={!canRedo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(REDO_COMMAND, undefined)
        }}
        title={IS_APPLE ? 'Redo (⌘Y)' : 'Redo (Ctrl+Y)'}
        className="li-editor-toolbar-item"
        aria-label="Redo"
      >
        <IconRedo />
      </button>
    </div>
  )
}
