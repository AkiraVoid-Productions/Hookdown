import {
  getNativeElementProps,
  MenuButton,
  MenuItemRadio,
  MenuPopover,
  resolveShorthand,
} from '@fluentui/react-components';
import { WeatherSunny24Regular } from '@fluentui/react-icons';
import { UseComponent } from '../../types/UseComponent';
import { useTheme } from '../../utilities/theme';
import { ThemeSelectorProps, ThemeSelectorStates } from './ThemeSelector.types';
import React from 'react';

/**
 * Given user props, defines default props for the ThemeSelector, and returns
 * processed states.
 *
 * @param props User provided props to the ThemeSelector component.
 * @param ref User provided ref to be passed to the ThemeSelector component.
 * @returns Processed states.
 */
export const useThemeSelector: UseComponent<
  ThemeSelectorProps,
  ThemeSelectorStates
> = (props, ref) => {
  const {
    menuTrigger,
    menuPopover,
    strings,
    isDarkModeDisabled,
    isLightModeDisabled,
    isFollowSystemDisabled,
    isDisabled,
    menuProps,
  } = props;

  const { theme, changeTheme } = useTheme();

  const resolvedMenuTrigger = resolveShorthand(menuTrigger, {
    required: true,
    defaultProps: {
      disabled: isDisabled,
      children: 'Theme',
      icon: <WeatherSunny24Regular />,
      appearance: 'transparent',
      'aria-label':
        strings?.tooltip !== null
          ? strings?.tooltip ?? 'Change the theme of this website.'
          : undefined,
    },
  });

  const resolvedMenuPopover = resolveShorthand(menuPopover, { required: true });

  return {
    components: {
      root: 'div',
      menuTrigger: MenuButton,
      menuPopover: MenuPopover,
    },
    root: getNativeElementProps('div', {
      ref,
      children: (
        <>
          <MenuItemRadio
            name='theme'
            value='system'
            disabled={isFollowSystemDisabled}
          >
            {strings?.themeFollowBrowser ?? 'Follow browser theme'}
          </MenuItemRadio>
          <MenuItemRadio
            name='theme'
            value='light'
            disabled={isLightModeDisabled}
          >
            {strings?.themeLight ?? 'Light theme'}
          </MenuItemRadio>
          <MenuItemRadio
            name='theme'
            value='dark'
            disabled={isDarkModeDisabled}
          >
            {strings?.themeDark ?? 'Dark theme'}
          </MenuItemRadio>
        </>
      ),
      ...props,
    }),
    menuProps: {
      hasCheckmarks: true,
      checkedValues: { theme: [theme] },
      onCheckedValueChange: (_, data) => {
        if (data.name === 'theme') {
          changeTheme(data.checkedItems[0] as 'system' | 'light' | 'dark');
        }
      },
      ...menuProps,
      children: <></>,
    },
    menuTrigger: resolvedMenuTrigger,
    menuPopover: resolvedMenuPopover,
    triggerLabel:
      strings?.tooltip !== null
        ? strings?.tooltip ?? 'Change the theme of this website.'
        : null,
  };
};
