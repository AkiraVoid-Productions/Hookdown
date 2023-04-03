import { ForwardRefComponent } from '@fluentui/react-components';
import { forwardRef } from 'react';
import { useCodeBlock } from './CodeBlock.props';
import { renderCodeBlock } from './CodeBlock.render';
import { useCodeBlockStyles } from './CodeBlock.styles';
import { CodeBlockProps } from './CodeBlock.types';

/**
 * A component that wraps original `<pre />` element for matching it with the
 * Fluent Design system.
 */
const Component: ForwardRefComponent<CodeBlockProps> = forwardRef(
  (props, ref) => {
    const states = useCodeBlock(props, ref);
    useCodeBlockStyles(states);

    return renderCodeBlock(states);
  }
);

Component.displayName = 'CodeBlock';

export { Component };
