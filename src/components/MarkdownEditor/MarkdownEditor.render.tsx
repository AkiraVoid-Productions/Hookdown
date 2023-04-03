import { RenderComponent } from '@/types/RenderComponent';
import {
  MarkdownEditorSlots,
  MarkdownEditorStates,
} from './MarkdownEditor.types';
import { getSlots } from '@fluentui/react-components';

/**
 * Render the final JSX of MarkdownEditor.
 *
 * @param states States processed with user provided props and refs.
 * @returns The final JSX of MarkdownEditor.
 */
export const renderMarkdownEditor: RenderComponent<
  MarkdownEditorStates
> = states => {
  const { slots, slotProps } = getSlots<MarkdownEditorSlots>(states);

  return (
    <slots.root {...slotProps.root}>
      {slots.toolBar && <slots.toolBar {...slotProps.toolBar} />}
      {slots.editArea && (
        <slots.editArea {...slotProps.editArea}>
          {slots.editor && <slots.editor {...slotProps.editor} />}
          {slots.viewer && <slots.viewer {...slotProps.viewer} />}
        </slots.editArea>
      )}
    </slots.root>
  );
};
