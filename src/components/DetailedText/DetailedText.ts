import { ForwardRefComponent } from '@fluentui/react-components';
import { forwardRef } from 'react';
import { DetailedTextProps } from './DetailedText.types';
import { useDetailedText } from './DetailedText.props';
import { useDetailedTextStyles } from './DetailedText.styles';
import { renderDetailedText } from './DetailedText.render';

/**
 * A component that shows texts with details information which is hided and will
 * be shown when the info icon get focused.
 */
export const Component: ForwardRefComponent<DetailedTextProps> = forwardRef(
  (props, ref) => {
    const states = useDetailedText(props, ref);
    useDetailedTextStyles(states);

    return renderDetailedText(states);
  }
);

Component.displayName = 'DetailedText';
