import { IComponentStrings } from '@/types/IComponentStrings';
import {
  ComponentProps,
  ComponentState,
  MenuButton,
  MenuPopover,
  MenuProps,
  Slot,
} from '@fluentui/react-components';

export type ThemeSelectorSlots = {
  root: NonNullable<Slot<'div'>>;
  menuTrigger?: NonNullable<Slot<typeof MenuButton>>;
  menuPopover?: Slot<typeof MenuPopover>;
};

export type ThemeSelectorProps = ComponentProps<ThemeSelectorSlots> &
  IComponentStrings<
    'themeDark' | 'themeLight' | 'themeFollowBrowser' | 'tooltip'
  > & {
    /** Indicates if dark theme selection should be disabled. */
    isDarkModeDisabled?: boolean;
    /** Indicates if light theme selection should be disabled. */
    isLightModeDisabled?: boolean;
    /** Indicates if follow browser selection should be disabled. */
    isFollowSystemDisabled?: boolean;
    /** Indicates if the selector should be disabled. */
    isDisabled?: boolean;
    /**
     * The properties of the menu used by ThemeSelector, can be used to
     * customize the menu.
     */
    menuProps?: MenuProps;
  };

export type ThemeSelectorStates = ComponentState<ThemeSelectorSlots> &
  Required<Pick<ThemeSelectorProps, 'menuProps'>> & {
    triggerLabel: string | null;
  };
