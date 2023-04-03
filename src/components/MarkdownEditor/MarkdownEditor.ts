import { ForwardRefComponent } from '@fluentui/react-components';
import { forwardRef } from 'react';
import { MarkdownEditorProps } from './MarkdownEditor.types';
import { useMarkdownEditor } from './MarkdownEditor.props';
import { useMarkdownEditorStyles } from './MarkdownEditor.styles';
import { renderMarkdownEditor } from './MarkdownEditor.render';

/**
 * The component that let users edit their Markdown texts, and display previews
 * of them.
 */
export const Component: ForwardRefComponent<MarkdownEditorProps> = forwardRef(
  (props, ref) => {
    const states = useMarkdownEditor(props, ref);
    useMarkdownEditorStyles(states);

    return renderMarkdownEditor(states);
  }
);

Component.displayName = 'MarkdownEditor';
