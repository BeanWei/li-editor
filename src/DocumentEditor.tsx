export interface DocumentEditorProps {
  namespace?: string;
  placeholder?: string | JSX.Element;
  isReadOnly?: boolean;
  onChange?: (editorState: any) => void;
}

export default function DocumentEditor(props: DocumentEditorProps) {}
