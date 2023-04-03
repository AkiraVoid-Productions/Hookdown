import {
  SlotClassNames,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import {
  MarkdownEditorSlots,
  MarkdownEditorStates,
} from './MarkdownEditor.types';

export const markdownEditorClassNames: SlotClassNames<MarkdownEditorSlots> = {
  editArea: 'MarkdownEditor_EditArea',
  editor: 'MarkdownEditor_Editor',
  root: 'MarkdownEditor',
  toolBar: 'MarkdownEditor_ToolBar',
  viewer: 'MarkdownEditor_Viewer',
};

const useStyles = makeStyles<keyof MarkdownEditorSlots>({
  editArea: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  editor: {
    width: '50%',
  },
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  toolBar: {},
  viewer: {
    width: '50%',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    ...shorthands.overflow('hidden', 'auto'),
  },
});

export function useMarkdownEditorStyles(states: MarkdownEditorStates) {
  const classNames = useStyles();

  states.root.className = mergeClasses(
    markdownEditorClassNames.root,
    classNames.root,
    states.root.className
  );

  if (states.editArea) {
    states.editArea.className = mergeClasses(
      markdownEditorClassNames.editArea,
      classNames.editArea,
      states.editArea.className
    );
  }

  if (states.editor) {
    states.editor.className = mergeClasses(
      markdownEditorClassNames.editor,
      classNames.editor,
      states.editor.className
    );
  }

  if (states.toolBar) {
    states.toolBar.className = mergeClasses(
      markdownEditorClassNames.toolBar,
      classNames.toolBar,
      states.toolBar.className
    );
  }

  if (states.viewer) {
    states.viewer.className = mergeClasses(
      markdownEditorClassNames.viewer,
      classNames.viewer,
      states.viewer.className
    );
  }

  return states;
}
