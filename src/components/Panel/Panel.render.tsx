import { RenderComponent } from '@/types/RenderComponent';
import { PanelSlots, PanelStates } from './Panel.types';
import { Portal, getSlots } from '@fluentui/react-components';

/**
 * Render the final JSX of Panel.
 *
 * @param states States processed with user provided props and refs.
 * @returns The final JSX of Panel.
 */
export const renderPanel: RenderComponent<PanelStates> = states => {
  const { slots, slotProps } = getSlots<PanelSlots>(states);

  return states.shouldRender ? (
    <Portal>
      {slots.backdrop && <slots.backdrop {...slotProps.backdrop} />}
      <slots.root {...slotProps.root}>
        {slots.header && (
          <slots.header {...slotProps.header}>
            {slots.headerText && <slots.headerText {...slotProps.headerText} />}
            {slots.closeButton && (
              <slots.closeButton {...slotProps.closeButton} />
            )}
          </slots.header>
        )}
        {slots.itemContainer && (
          <slots.itemContainer {...slotProps.itemContainer}>
            {states.children}
          </slots.itemContainer>
        )}
      </slots.root>
    </Portal>
  ) : (
    <></>
  );
};
