import { ForwardRefComponent } from '@fluentui/react-components';
import { forwardRef } from 'react';
import { useBlockquote } from './Blockquote.props';
import { renderBlockquote } from './Blockquote.render';
import { useBlockquoteStyles } from './Blockquote.styles';
import { BlockquoteProps } from './Blockquote.types';

/**
 * A component which wraps original `<blockquote />` element for matching it
 * with the Fluent Design system.
 */
const Component: ForwardRefComponent<BlockquoteProps> = forwardRef(
  (props, ref) => {
    const states = useBlockquote(props, ref);
    useBlockquoteStyles(states);

    return renderBlockquote(states);
  }
);

Component.displayName = 'Blockquote';

export { Component };
