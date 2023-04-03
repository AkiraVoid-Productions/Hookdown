import { ForwardRefComponent } from '@fluentui/react-components';
import { forwardRef } from 'react';
import { useThemeSelector } from './ThemeSelector.props';
import { renderThemeSelector } from './ThemeSelector.render';
import { useThemeSelectorStyles } from './ThemeSelector.styles';
import { ThemeSelectorProps } from './ThemeSelector.types';

/** A component that let users select the theme of this site. */
const Component: ForwardRefComponent<ThemeSelectorProps> = forwardRef(
  (props, ref) => {
    const states = useThemeSelector(props, ref);
    useThemeSelectorStyles(states);

    return renderThemeSelector(states);
  }
);

Component.displayName = 'ThemeSelector';

export { Component };
