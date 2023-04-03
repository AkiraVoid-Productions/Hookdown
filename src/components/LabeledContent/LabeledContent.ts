import { ForwardRefComponent } from '@fluentui/react-components';
import { forwardRef } from 'react';
import { LabeledContentProps } from './LabeledContent.types';
import { useLabeledContent } from './LabeledContent.props';
import { useLabeledContentStyles } from './LabeledContent.styles';
import { renderLabeledContent } from './LabeledContent.render';

/** A component that attach a label to children. */
export const Component: ForwardRefComponent<LabeledContentProps> = forwardRef(
  (props, ref) => {
    const states = useLabeledContent(props, ref);
    useLabeledContentStyles(states);

    return renderLabeledContent(states);
  }
);

Component.displayName = 'LabeledContent';
