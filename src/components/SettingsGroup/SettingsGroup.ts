import { ForwardRefComponent } from '@fluentui/react-components';
import { forwardRef } from 'react';
import { SettingsGroupProps } from './SettingsGroup.types';
import { useSettingsGroup } from './SettingsGroup.props';
import { useSettingsGroupStyles } from './SettingsGroup.styles';
import { renderSettingsGroup } from './SettingsGroup.render';

/**
 * A component that organizes a series of setting items, and gives them a
 * header.
 */
export const Component: ForwardRefComponent<SettingsGroupProps> = forwardRef(
  (props, ref) => {
    const states = useSettingsGroup(props, ref);
    useSettingsGroupStyles(states);

    return renderSettingsGroup(states);
  }
);

Component.displayName = 'SettingsGroup';
