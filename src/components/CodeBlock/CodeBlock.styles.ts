import {
  makeStyles,
  mergeClasses,
  shorthands,
  SlotClassNames,
  tokens,
} from '@fluentui/react-components';
import { CodeBlockSlots, CodeBlockStates } from './CodeBlock.types';

export const codeBlockClassNames: SlotClassNames<CodeBlockSlots> = {
  root: 'CodeBlock',
  code: 'CodeBlock--Code',
  codeInfo: 'CodeBlock--Info',
  copyButton: 'CodeBlock--CopyButton',
  languageTag: 'CodeBlock--Language',
};

const useStyles = makeStyles({
  root: {
    position: 'relative',
    backgroundColor: tokens.colorNeutralBackground2,
    width: '100%',
    fontFamily: tokens.fontFamilyMonospace,
    boxSizing: 'border-box',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.overflow('hidden'),
  },
  code: {
    fontFamily: tokens.fontFamilyMonospace,
    backgroundColor: tokens.colorTransparentBackground,
    width: '100%',
    maxHeight: '500px',
    color: tokens.colorNeutralForeground1,
    display: 'block',
    boxSizing: 'border-box',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    ...shorthands.overflow('auto'),
    '& code': {
      fontFamily: tokens.fontFamilyMonospace,
    },
    '& .hljs-keyword, & .hljs-variable.language_, & .hljs-doctag, & .hljs-attr, & .hljs-attribute, & .hljs-selector-attr':
      {
        color: tokens.colorPaletteBerryForeground1,
      },
    '& .hljs-built_in, & .hljs-operator, & .hljs-bullet, & .hljs-selector-pseudo, & .hljs-template-tag':
      {
        color: tokens.colorPaletteLightTealForeground2,
      },
    '& .hljs-type, & .hljs-title, & .hljs-title.class_, & .hljs-selector-class':
      {
        color: tokens.colorPalettePeachForeground2,
      },
    '& .hljs-literal,& .hljs-number, & .hljs-tag, & .hljs-symbol, & .hljs-selector-tag':
      {
        color: tokens.colorPaletteDarkOrangeForeground1,
      },
    '& .hljs-string, & .hljs-code, & .hljs-addition': {
      color: tokens.colorPaletteGreenForeground1,
    },
    '& .hljs-char.escape_': {
      color: tokens.colorNeutralForeground1,
    },
    '& .hljs-variable.language_, & .hljs-params, & .hljs-doctag, & .hljs-comment, & .hljs-emphasis, & .hljs-quote':
      {
        fontStyle: 'italic',
      },
    '& .hljs-comment , & .hljs-quote': {
      color: tokens.colorNeutralForeground4,
    },
    '& .hljs-title.function_, & .hljs-selector-id': {
      color: tokens.colorPaletteCornflowerForeground2,
    },
    '& .hljs-meta, & .hljs-strong': {
      fontWeight: tokens.fontWeightSemibold,
    },
    '& .hljs-link': {
      color: tokens.colorBrandForeground1,
      textDecorationLine: 'underline',
    },
    '& .hljs-deletion': {
      color: tokens.colorPaletteRedForeground2,
      width: '100%',
      display: 'inline-block',
      backgroundColor: tokens.colorPaletteRedBackground2,
    },
    '& .hljs-addition': {
      width: '100%',
      display: 'inline-block',
      backgroundColor: tokens.colorPaletteGreenBackground1,
    },
  },
  codeInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalM),
  },
  copyButton: {},
  languageTag: {},
  copyButtonHidden: {
    display: 'none',
  },
});

export const useCodeBlockStyles = (states: CodeBlockStates) => {
  const classNames = useStyles();

  states.root.className = mergeClasses(
    codeBlockClassNames.root,
    classNames.root,
    states.root.className
  );

  if (states.code) {
    states.code.className = mergeClasses(
      codeBlockClassNames.code,
      classNames.code,
      states.code.className
    );
  }

  if (states.codeInfo) {
    states.codeInfo.className = mergeClasses(
      codeBlockClassNames.codeInfo,
      classNames.codeInfo,
      states.codeInfo.className
    );
  }

  if (states.copyButton) {
    states.copyButton.className = mergeClasses(
      codeBlockClassNames.copyButton,
      classNames.copyButton,
      states.showCopyButton ? undefined : classNames.copyButtonHidden,
      states.copyButton.className
    );
  }

  if (states.languageTag) {
    states.languageTag.className = mergeClasses(
      codeBlockClassNames.languageTag,
      classNames.languageTag,
      states.languageTag.className
    );
  }

  return states;
};
