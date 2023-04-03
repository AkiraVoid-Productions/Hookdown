import { ForwardRefComponent } from '@fluentui/react-components';
import { forwardRef } from 'react';
import { PanelProps } from './Panel.types';
import { usePanel } from './Panel.props';
import { usePanelStyles } from './Panel.styles';
import { renderPanel } from './Panel.render';

/**
 * A drawer-like component that will hide on usual. Can be controlled by
 * `isOpen` property.
 */
export const Component: ForwardRefComponent<PanelProps> = forwardRef(
  (props, ref) => {
    const states = usePanel(props, ref);
    usePanelStyles(states);

    return renderPanel(states);
  }
);

Component.displayName = 'Panel';
