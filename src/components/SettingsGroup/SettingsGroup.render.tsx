import { RenderComponent } from '@/types/RenderComponent';
import { SettingsGroupSlots, SettingsGroupStates } from './SettingsGroup.types';
import { getSlots } from '@fluentui/react-components';

/**
 * Render the final JSX of SettingsGroup.
 *
 * @param states States processed with user provided props and refs.
 * @returns The final JSX of SettingsGroup.
 */
export const renderSettingsGroup: RenderComponent<
  SettingsGroupStates
> = states => {
  const { slots, slotProps } = getSlots<SettingsGroupSlots>(states);

  return (
    <slots.root {...slotProps.root}>
      {slots.header && <slots.header {...slotProps.header} />}
      {slots.itemContainer && (
        <slots.itemContainer {...slotProps.itemContainer}>
          {states.children}
        </slots.itemContainer>
      )}
    </slots.root>
  );
};
