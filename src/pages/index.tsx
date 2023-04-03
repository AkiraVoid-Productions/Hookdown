import EditorToolbar from '@/components/EditorToolbar';
import MarkdownEditor from '@/components/MarkdownEditor';
import { useMarkdownProcessor } from '@/utilities/common';
import {
  makeStyles,
  makeStaticStyles,
  mergeClasses,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { editor } from 'monaco-editor';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.overflow('hidden'),
  },
});

const useStaticStyles = makeStaticStyles({
  code: {
    backgroundColor: tokens.colorNeutralBackground5,
    boxSizing: 'border-box',
    fontFamily: tokens.fontFamilyMonospace,
    borderRadius: tokens.borderRadiusSmall,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXS}`,
    margin: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalXXS}`,
  },
  p: {
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalNone}`,
  },
});

export default function Home() {
  const classNames = useStyles();
  const { t } = useTranslation('common', { keyPrefix: 'markdownEditor' });
  const [editor, setEditor] = React.useState<editor.IStandaloneCodeEditor>();
  useStaticStyles();

  return (
    <MarkdownEditor
      className={mergeClasses(classNames.root)}
      toolBar={<EditorToolbar editor={editor} />}
      onMount={editorInstance => setEditor(editorInstance)}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale ?? 'en', ['common']);
  return {
    props: {
      ...translations,
    },
  };
};
