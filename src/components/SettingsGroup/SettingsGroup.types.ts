import {
  ComponentProps,
  ComponentState,
  Slot,
  Text,
} from '@fluentui/react-components';

export type SettingsGroupSlots = {
  root: NonNullable<Slot<'section', 'div'>>;
  header?: Slot<typeof Text, 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
  itemContainer?: NonNullable<Slot<'div', 'nav'>>;
};

export type SettingsGroupProps = ComponentProps<SettingsGroupSlots>;

export type SettingsGroupStates = ComponentState<SettingsGroupSlots> &
  Pick<SettingsGroupProps, 'children'>;
