import {
  ComponentProps,
  ComponentState,
  Slot,
  Toolbar,
} from '@fluentui/react-components';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import React from 'react';

export type MarkdownEditorSlots = {
  editArea?: Slot<'div'>;
  // NOTE - The i18n library re-declared the type of children,
  // we need to declare it back here to avoid compiler error.
  editor?: Slot<typeof MonacoEditor> & {
    children?: React.ReactNode;
  };
  root: Slot<'div'>;
  toolBar?: Slot<typeof Toolbar, 'div'> | null;
  viewer?: Slot<'div'> | null;
};

export type MarkdownEditorProps = ComponentProps<MarkdownEditorSlots> & {
  onMount?: OnMount;
};

export type MarkdownEditorStates = ComponentState<MarkdownEditorSlots>;
