import {
  Badge,
  Button,
  getNativeElementProps,
  resolveShorthand,
} from '@fluentui/react-components';
import { Copy24Filled, Copy24Regular } from '@fluentui/react-icons';
import React from 'react';
import { UseComponent } from '../../types/UseComponent';
import { getReactChildrenString } from '../../utilities/common';
import { CodeBlockProps, CodeBlockStates } from './CodeBlock.types';

/**
 * Given user props, defines default props for the CodeBlock, and returns
 * processed states.
 *
 * @param props User provided props to the CodeBlock component.
 * @param ref User provided ref to be passed to the CodeBlock component.
 * @returns Processed states.
 */
export const useCodeBlock: UseComponent<CodeBlockProps, CodeBlockStates> = (
  props,
  ref
) => {
  const {
    code,
    codeInfo,
    languageTag,
    copyButton,
    showCopyButton,
    language,
    strings,
  } = props;
  const [isCopied, setIsCopied] = React.useState(false);

  React.useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 3000);
    }
  }, [isCopied]);

  const resolvedCode = resolveShorthand(code, { required: true });

  const resolvedCodeInfo = resolveShorthand(codeInfo, { required: true });

  const resolvedLanguageTag = resolveShorthand(languageTag, {
    required: true,
    defaultProps: {
      children: language,
      appearance: 'outline',
    },
  });

  const resolvedCopyButton = resolveShorthand(copyButton, {
    required: true,
    defaultProps: {
      icon: isCopied ? <Copy24Filled /> : <Copy24Regular />,
      onClick: () => {
        if (navigator && navigator.clipboard) {
          navigator.clipboard.writeText(
            getReactChildrenString(props.children) ?? ''
          );
          setIsCopied(true);
        }
      },
    },
  });

  return {
    components: {
      root: 'pre',
      code: 'code',
      codeInfo: 'div',
      languageTag: Badge,
      copyButton: Button,
    },
    root: getNativeElementProps('pre', { ref, ...props }),
    showCopyButton: showCopyButton === undefined ? true : showCopyButton,
    isCopied,
    strings: {
      copyTip: 'Copy',
      copiedTip: ' Copied!',
      ...strings,
    },
    code: resolvedCode,
    codeInfo: resolvedCodeInfo,
    languageTag: resolvedLanguageTag,
    copyButton: resolvedCopyButton,
  };
};
