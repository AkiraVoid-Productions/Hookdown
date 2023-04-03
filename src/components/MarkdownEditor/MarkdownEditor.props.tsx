import { UseComponent } from '@/types/UseComponent';
import {
  MarkdownEditorProps,
  MarkdownEditorStates,
} from './MarkdownEditor.types';
import {
  Toolbar,
  getNativeElementProps,
  resolveShorthand,
  useIsSSR,
} from '@fluentui/react-components';
import MonacoEditor from '@monaco-editor/react';
import GitHubLight from 'monaco-themes/themes/GitHub Light.json';
import GitHubDark from 'monaco-themes/themes/GitHub Dark.json';
import React from 'react';
import { useTheme } from '@/utilities/theme';
import Monaco, { editor } from 'monaco-editor';
import { useMarkdownProcessor } from '@/utilities/common';

/**
 * Given user props, defines default props for the MarkdownEditor, and returns
 * processed states.
 *
 * @param props User provided props to the MarkdownEditor component.
 * @param ref User provided ref to be passed to the MarkdownEditor component.
 * @returns Processed states.
 */
export const useMarkdownEditor: UseComponent<
  MarkdownEditorProps,
  MarkdownEditorStates
> = (props, ref) => {
  const isSsr = useIsSSR();
  const { appliedTheme } = useTheme();
  const [monaco, setMonaco] = React.useState<typeof Monaco>();
  const [markdown, setMarkdown] = React.useState<string>();
  const [viewerChildren, setViewerChildren] = React.useState<React.ReactNode>();
  const rootRef = React.useRef();

  const markdownProcessor = useMarkdownProcessor();

  React.useEffect(() => {
    if (!isSsr && monaco) {
      monaco.editor.defineTheme(
        appliedTheme,
        (appliedTheme === 'dark'
          ? GitHubDark
          : GitHubLight) as editor.IStandaloneThemeData
      );
      monaco.editor.setTheme(appliedTheme);
    }
  }, [appliedTheme, isSsr, monaco]);

  React.useEffect(() => {
    setViewerChildren(markdownProcessor.process(markdown ?? ''));
  }, [markdown, markdownProcessor]);

  const { editArea, editor, toolBar, viewer } = props;

  const resolvedEditArea = resolveShorthand(editArea, {
    required: true,
    defaultProps: {},
  });

  const resolvedEditor = resolveShorthand(editor, {
    required: true,
    defaultProps: {
      width: '50%',
      language: 'markdown',
      onMount: (editorInstance, instance) => {
        setMonaco(instance);
        props.onMount && props.onMount(editorInstance, instance);
      },
      onChange: value => {
        setMarkdown(value);
      },
      options: { wordWrap: 'on' },
    },
  });

  const resolvedToolBar = resolveShorthand(toolBar, {
    required: true,
    defaultProps: {},
  });

  const resolvedViewer = resolveShorthand(viewer, {
    required: true,
    defaultProps: {
      children: viewerChildren,
    },
  });

  return {
    components: {
      root: 'div',
      editArea: 'div',
      // NOTE - Fluent UI Slot utility type not work with some of 3rd party components.
      // Use `any` to bypass type check.
      editor: MonacoEditor as any,
      toolBar: Toolbar,
      viewer: 'div',
    },
    root: getNativeElementProps('div', { ...props, ref: rootRef }),
    editArea: resolvedEditArea,
    editor: resolvedEditor,
    toolBar: resolvedToolBar,
    viewer: resolvedViewer,
    strings: {},
  };
};
