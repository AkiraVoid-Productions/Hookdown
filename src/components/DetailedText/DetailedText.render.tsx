import { RenderComponent } from '@/types/RenderComponent';
import { DetailedTextSlots, DetailedTextStates } from './DetailedText.types';
import { Tooltip, getSlots } from '@fluentui/react-components';

/**
 * Render the final JSX of DetailedText.
 *
 * @param states States processed with user provided props and refs.
 * @returns The final JSX of DetailedText.
 */
export const renderDetailedText: RenderComponent<
  DetailedTextStates
> = states => {
  const { slots, slotProps } = getSlots<DetailedTextSlots>(states);

  return (
    <slots.root {...slotProps.root}>
      {states.children}
      {slots.details && (
        <Tooltip
          relationship='description'
          content={<slots.details {...slotProps.details} />}
          withArrow
        >
          <div>
            {slots.detailsIcon && (
              <slots.detailsIcon {...slotProps.detailsIcon} />
            )}
          </div>
        </Tooltip>
      )}
    </slots.root>
  );
};
